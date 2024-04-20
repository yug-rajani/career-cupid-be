import mongoose from "mongoose";
import JobPostingSchema, { IJobPosting } from "./JobPostingSchema";

const JobPostingModel = mongoose.model<IJobPosting>("JobPostingModel", JobPostingSchema);

export default JobPostingModel;