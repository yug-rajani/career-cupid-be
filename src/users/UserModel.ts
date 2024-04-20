import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserSchema, { IUser } from "./UserSchema";

const saltRounds = 8;

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

const UserModel = mongoose.model<IUser>("UserModel", UserSchema);

export default UserModel;