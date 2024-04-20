import { IUser } from "./UserSchema";
import * as userDao from "./UserDao";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middlewares/Auth";

export async function register(user: IUser): Promise<IUser> {
  const newUser = await userDao.createUser(user);
  return newUser;
}

export async function login(user: IUser) {
  const foundUser = await userDao.findUserByCriteria({ email: user.email, role: user.role });

  if (!foundUser) {
    throw new Error("Email/Password incorrect");
  }

  const isMatch = bcrypt.compareSync(user.password, foundUser.password);

  if (isMatch) {
    const token = jwt.sign(
      {
        _id: foundUser._id?.toString(),
        firstname: foundUser.firstname,
        lastname: foundUser.lastname,
        email: foundUser.email,
        role: foundUser.role,
      },
      SECRET_KEY,
      {
        expiresIn: "30 days",
      }
    );

    return { token: token };
  } else {
    throw new Error("Email/Password incorrect");
  }
}
