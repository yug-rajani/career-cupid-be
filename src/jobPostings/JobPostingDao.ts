import jobPostingModel from "./JobPostingModel";
import { IJobPosting } from "./JobPostingSchema";

export const createJobPosting = (jobPosting: IJobPosting) => {
  delete jobPosting._id;
  return jobPostingModel.create(jobPosting);
};

export const findAllJobPostings = () =>
  jobPostingModel.find();

export const findJobPostingById = (jobPostingId: string) =>
  jobPostingModel.findById(jobPostingId);

export const updateJobPosting = (jobPostingId: string, jobPosting: IJobPosting) =>
  jobPostingModel.updateOne({ _id: jobPostingId }, { $set: jobPosting });

export const deleteJobPosting = (jobPostingId: string) =>
  jobPostingModel.deleteOne({ _id: jobPostingId });

export const findJobPostingsByFilter = (filter: Record<string, unknown>) =>
  jobPostingModel.find(filter);

export const addApplicantToJobPosting = (jobPostingId: string, applicantId: string) =>
  jobPostingModel.updateOne({ _id: jobPostingId }, { $push: { applicants: applicantId } });

export const shortlistApplicantForJobPosting = (jobPostingId: string, applicantId: string) =>
  jobPostingModel.updateOne({ _id: jobPostingId }, { $push: { shortlisted_applicants: applicantId } });