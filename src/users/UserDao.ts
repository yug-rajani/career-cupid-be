import userModel from "./UserModel";
import { IUser } from "./UserSchema";

export const createUser = (user: IUser) => {
  delete user._id;
  return userModel.create(user);
};

export const findAllUsers = (queryParams) => {
  let queries = getCriterias(queryParams);
  return userModel.find(queries);
};

export const findUserById = (userId: String) => userModel.findById(userId);
export const updateUser = (userId: String, user: IUser) =>
  userModel.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId: String) => userModel.deleteOne({ _id: userId });
export const findUserByCriteria = (queries: Object) => userModel.findOne(queries);

const getCriterias = (queryParams): Object => {
  let queries = {};

  if (queryParams.emails) {
    const emailsArr = queryParams.emails.split(",");
    queries["email"] = { $in: emailsArr };
  }

  if (queryParams.disabled) {
    queries["disabled"] = queryParams.disabled;
  }

  if (queryParams.username) {
    queries["username"] = queryParams.username;
  }

  if (queryParams.usernames) {
    queries["username"] = { $in: queryParams.username.split(",") };
  }

  if (queryParams.userIds) {
    queries["_id"] = { $in: queryParams.userIds.split(",") };
  }

  return queries;
};
