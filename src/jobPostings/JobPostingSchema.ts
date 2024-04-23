import mongoose from "mongoose";

export interface IJobPosting extends mongoose.Document {
  company: string;
  title: string;
  description: string;
  city: string;
  state: string;
  country: string;
  salary: number;
  industry: string;
  openings: number;
  remote: boolean;
  hybrid: boolean;
  full_time: boolean;
  created_at: number;
  updated_at: number;
  applicants: mongoose.Types.ObjectId[];
  skills: string[];
  experience: number;
  recruiterId: mongoose.Types.ObjectId;
  shortlisted_applicants: mongoose.Types.ObjectId[];
  company_logo: string;
}

const JobPostingSchema: mongoose.Schema<IJobPosting> = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    salary: { type: Number, required: true, default: -1 },
    industry: { type: String, required: true, trim: true },
    openings: { type: Number, required: true },
    remote: { type: Boolean, required: true, default: false },
    hybrid: { type: Boolean, required: true, default: false },
    full_time: { type: Boolean, required: true, default: true },
    created_at: { type: Number, required: true, default: Date.now() },
    updated_at: { type: Number, required: true, default: Date.now() },
    applicants: { type: [mongoose.Schema.Types.ObjectId], ref: "seekers", required: true },
    shortlisted_applicants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "seekers",
      required: true,
    },
    skills: { type: [String], required: true },
    experience: { type: Number, required: true },
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "recruiters", required: true },
    company_logo: { type: String, required: false },
  },
  { collection: "job_postings" }
);

//text criteria for search
JobPostingSchema.index({
  title: "text",
  description: "text",
  company: "text",
  city: "text",
  state: "text",
  country: "text",
  industry: "text",
  skills: "text",
});

export default JobPostingSchema;
