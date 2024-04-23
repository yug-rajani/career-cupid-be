import { IUser } from "./UserSchema";
import * as userDao from "./UserDao";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomRequest, SECRET_KEY, decodeToken } from "../middlewares/Auth";
import { sendEmail } from "../utils/MailSender";
import * as Constants from "../utils/Constants";
import * as CommonUtil from "../utils/CommonUtil";

export async function register(user: IUser): Promise<IUser> {
  const newUser = await userDao.createUser(user);

  const htmlString = await CommonUtil.readFile(Constants.REGISTRATION_EMAIL_TEMPLATE);
  const token = generateJWTToken(newUser);

  // Send email to the user
  let emailParams = new Map<String, String>();
  emailParams.set("firstname", newUser.firstname);
  emailParams.set("lastname", newUser.lastname);
  emailParams.set(
    "verification_url",
    `${process.env.REACT_APP_BASE_URL}/confirm-email?token=${token}`
  );

  const sendRegistrationEmail = await sendEmail(
    "gre.darshan@gmail.com",
    "Career Cupid",
    newUser.email,
    `${newUser.firstname} + " " + ${newUser.lastname}`,
    "Welcome to Career Cupid",
    htmlString.toString(),
    emailParams
  );

  console.log(
    `Status of the email for email: ${newUser.email} ` + sendRegistrationEmail.response.status
  );

  return newUser;
}

export async function login(user: IUser) {
  const foundUser = await userDao.findUserByCriteria({
    email: user.email,
    role: user.role,
  });

  if (!foundUser) {
    throw new Error("Email/Password incorrect");
  }

  if (foundUser.disabled) {
    throw new Error("Please verify your email");
  }

  const isMatch = bcrypt.compareSync(user.password, foundUser.password);

  if (isMatch) {
    const token = generateJWTToken(foundUser);
    return { token: token, user: foundUser };
  } else {
    throw new Error("Email/Password incorrect");
  }
}

export async function deleteUser(userId: string): Promise<boolean> {
  const deleteResult = await userDao.deleteUser(userId);
  if (deleteResult.deletedCount && deleteResult.deletedCount > 0) {
    return true;
  } else {
    return false;
  }
}

export async function getAllUsers(queryParams): Promise<IUser[]> {
  const users = await userDao.findAllUsers(queryParams);
  return users;
}

export async function getUserById(userId: string): Promise<IUser | null> {
  const user = await userDao.findUserById(userId);
  return user;
}

export async function updateUser(userId: string, updatedUser: IUser): Promise<IUser | null> {
  const updatedResult = await userDao.updateUser(userId, updatedUser);
  if (updatedResult.modifiedCount === 0) {
    return null;
  }
  return updatedUser;
}

export async function confirmEmail(params): Promise<IUser | null> {
  const token = params.token;
  const verifyToken = await decodeToken(token);
  const userId = verifyToken["userId"];
  const user = await getUserById(userId);

  user.disabled = false;

  const updatedResult = await userDao.updateUser(userId, user);
  if (updatedResult.modifiedCount === 0) {
    return null;
  }
  return user;
}

export const getMyUser = async (token) => {
  const userId = token["userId"];
  const user = await getUserById(userId);
  return user;
}


const generateJWTToken = (user: IUser) => {
  const token = jwt.sign(
    {
      userId: user._id?.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    {
      expiresIn: "30 days",
    }
  );
  return token;
};
