import jobPostingModel from "./JobPostingModel";
import { IJobPosting } from "./JobPostingSchema";

export const createJobPosting = (jobPosting: IJobPosting) => {
  delete jobPosting._id;
  return jobPostingModel.create(jobPosting);
};

export const findAllJobPostings = () => jobPostingModel.find();
export const findJobPostingById = (jobPostingId: String) => jobPostingModel.findById(jobPostingId);
export const updateJobPosting = (jobPostingId: String, jobPosting: IJobPosting) =>
  jobPostingModel.updateOne({ _id: jobPostingId }, { $set: jobPosting });
export const deleteJobPosting = (jobPostingId: String) =>
  jobPostingModel.deleteOne({ _id: jobPostingId });
  export const findJobPostingsByFilter = (filter: Record<string, any>) =>
  jobPostingModel.find(filter);