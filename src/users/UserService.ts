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

    return { token: token, user:foundUser };
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

export async function getAllUsers(): Promise<IUser[]> {
  const users = await userDao.findAllUsers();
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
