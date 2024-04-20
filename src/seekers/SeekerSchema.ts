import mongoose from "mongoose";

export interface ISeeker extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    email: string;
    city: string;
    state: string;
    country: string;
    created_at: number;
    job_titles: string[];
    skills: string[];
    experience: number;
    education: string;
    resume: string;
    bio: string;
    profile_picture: string;
}

const SeekerSchema: mongoose.Schema<ISeeker> = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    email: { type: String, unique: true, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    created_at: { type: Number, required: true, default: Date.now() },
    job_titles: { type: [String], required: true },
    skills: { type: [String], required: true },
    experience: { type: Number, required: true, default: 0 },
    education: { type: String, required: true },
    resume: { type: String, required: true },
    bio: { type: String, required: true },
    profile_picture: { type: String, required: true }
},
    { collection: "seekers" }
);

export default SeekerSchema;