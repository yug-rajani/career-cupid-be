import mongoose from "mongoose";

enum Role {
  ADMIN = "ADMIN",
  SEEKER = "SEEKER",
  RECRUITER = "RECRUITER",
}

export interface IUser extends mongoose.Document {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  created_at: number;
  updated_at: number;
  disabled: boolean;
  role: Role;
}

const UserSchema: mongoose.Schema<IUser> = new mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    created_at: { type: Number, required: true, default: Date.now() },
    updated_at: { type: Number, required: true, default: Date.now() },
    disabled: { type: Boolean, required: true, default: true },
    role: { type: String, default: Role.SEEKER, enum: Object.values(Role), required: true },
  },
  { collection: "users" }
);

export default UserSchema;
