import userModel from "./UserModel";
import { IUser } from "./UserSchema";

export const createUser = (user: IUser) => {
  delete user._id;
  return userModel.create(user);
};

export const findAllUsers = () => userModel.find();
export const findUserById = (userId: String) => userModel.findById(userId);
export const updateUser = (userId: String, user: IUser) =>
  userModel.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId: String) => userModel.deleteOne({ _id: userId });
export const findUserByCriteria = (queries: Object) => userModel.findOne(queries);
