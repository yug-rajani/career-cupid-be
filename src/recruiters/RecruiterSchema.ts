import mongoose from "mongoose";

export interface IRecruiter extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  email: string;
  company: string;
  city: string;
  state: string;
  country: string;
  created_at: number;
  website: string;
  bio: string;
  profile_picture: string;
  approved: boolean;
}

const RecruiterSchema: mongoose.Schema<IRecruiter> = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    email: { type: String, unique: true, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    created_at: { type: Number, required: true, default: Date.now() },
    website: { type: String, required: true },
    bio: { type: String, required: true },
    profile_picture: { type: String, required: true },
    approved: { type: Boolean, default: false },
  },
  { collection: "recruiters" }
);

//text criteria for search
RecruiterSchema.index({ company: "text", bio: "text" });

export default RecruiterSchema;
