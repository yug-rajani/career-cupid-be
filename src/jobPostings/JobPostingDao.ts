import jobPostingModel from "./JobPostingModel";
import { IJobPosting } from "./JobPostingSchema";

export const createJobPosting = (jobPosting: IJobPosting) => {
  delete jobPosting._id;
  return jobPostingModel.create(jobPosting);
};

export const findAllJobPostings = (queryParams) => {
  let queries = getCriteria(queryParams);
  return jobPostingModel.find(queries);
};
export const findJobPostingById = (jobPostingId: String) => jobPostingModel.findById(jobPostingId);
export const updateJobPosting = (jobPostingId: String, jobPosting: IJobPosting) =>
  jobPostingModel.updateOne({ _id: jobPostingId }, { $set: jobPosting });
export const deleteJobPosting = (jobPostingId: String) =>
  jobPostingModel.deleteOne({ _id: jobPostingId });

const getCriteria = (queryParams): Object => {
  let queries = {};

  if (queryParams.countries) {
    const countriesArr = queryParams.countries.split(",");
    queries["country"] = { $in: countriesArr };
  }

  if (queryParams.states) {
    const statesArr = queryParams.states.split(",");
    queries["state"] = { $in: statesArr };
  }

  if (queryParams.cities) {
    const citiesArr = queryParams.states.split(",");
    queries["city"] = { $in: citiesArr };
  }

  if (queryParams.jobTitles) {
    const jobTitlesArr = queryParams.jobTitles.split(",");
    queries["jobTitle"] = { $in: jobTitlesArr };
  }

  if (queryParams.industries) {
    const industriesArr = queryParams.industries.split(",");
    queries["industry"] = { $in: industriesArr };
  }

  if (queryParams.skills) {
    const skillsArr = queryParams.skills.split(",");
    queries["skills"] = { $in: skillsArr };
  }

  if (queryParams.remote) {
    queries["remote"] = queryParams.remote;
  }

  if (queryParams.hybrid) {
    queries["hybrid"] = queryParams.hybrid;
  }

  if (queryParams.fullTime) {
    queries["fullTime"] = queryParams.fullTime;
  }

  if (queryParams.minSalary) {
    queries["salary"] = { $gte: queryParams.minSalary };
  }

  if (queryParams.maxSalary) {
    queries["salary"] = { $lte: queryParams.maxSalary };
  }

  if (queryParams.experience) {
    queries["experience"] = { $gte: queryParams.experience };
  }

  if (queryParams.openings) {
    queries["openings"] = { $gte: queryParams.openings };
  }

  if (queryParams.createdAfter) {
    queries["created_at"] = { $gte: queryParams.createdAfter };
  }

  if (queryParams.createdBefore) {
    queries["created_at"] = { $lte: queryParams.createdBefore };
  }

  if (queryParams.applicants) {
    const applicantsArr = queryParams.applicants.split(",");
    queries["applicants"] = { $in: applicantsArr };
  }

  if (queryParams.recruiterIds) {
    const recruiterIdsArr = queryParams.recruiterIds.split(",");
    queries["recruiterId"] = { $in: recruiterIdsArr };
  }

  if (queryParams.keyword) {
    queries["$text"] = { $search: queryParams.keyword };
  }

  return queries;
};
