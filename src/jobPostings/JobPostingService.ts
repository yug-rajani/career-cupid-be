import { IJobPosting } from "./JobPostingSchema";
import * as jobPostingDao from "./JobPostingDao";
import { getMyRecruiter } from "../recruiters/RecruiterService";

export async function createJobPosting(token, jobPosting: IJobPosting): Promise<IJobPosting> {
  const recruiter = await getMyRecruiter(token);
  jobPosting.recruiterId = recruiter._id;
  const newJobPosting = await jobPostingDao.createJobPosting(jobPosting);
  return newJobPosting;
}

export async function getAllJobPostings(queryParams): Promise<IJobPosting[]> {
  const jobPostings = await jobPostingDao.findAllJobPostings(queryParams);
  return jobPostings;
}

export async function getJobPostingById(jobId: string): Promise<IJobPosting | null> {
  const jobPosting = await jobPostingDao.findJobPostingById(jobId);
  return jobPosting;
}

export async function updateJobPosting(
  jobId: string,
  updatedJobPosting: IJobPosting
): Promise<IJobPosting | null> {
  const updatedResult = await jobPostingDao.updateJobPosting(jobId, updatedJobPosting);
  if (updatedResult.modifiedCount === 0) {
    return null;
  }
  return updatedJobPosting;
}

export async function deleteJobPosting(token, jobId: string): Promise<boolean> {
  if (token.role !== "ADMIN") {
    const recruiter = await getMyRecruiter(token);
    const jobPosting = await getJobPostingById(jobId);

    if (jobPosting.recruiterId !== recruiter._id) {
      throw new Error("You are not authorized to delete this job posting");
    }
  }

  const DeleteResult = await jobPostingDao.deleteJobPosting(jobId);

  if (DeleteResult.deletedCount && DeleteResult.deletedCount > 0) {
    return true;
  } else {
    return false;
  }
}

export async function getJobPostingsByFilter(
  filter: Record<string, unknown>
): Promise<IJobPosting[]> {
  const jobPostings = await jobPostingDao.findJobPostingsByFilter(filter);
  return jobPostings;
}

export async function addApplicantToJobPosting(
  jobId: string,
  applicantId: string
): Promise<IJobPosting> {
  const updatedResult = await jobPostingDao.addApplicantToJobPosting(jobId, applicantId);
  if (updatedResult.modifiedCount === 0) {
    throw new Error("Error applying to job posting");
  }
  return jobPostingDao.findJobPostingById(jobId);
}

export async function shortlistApplicantForJobPosting(
  jobId: string,
  applicantId: string
): Promise<IJobPosting> {
  const updatedResult = await jobPostingDao.shortlistApplicantForJobPosting(jobId, applicantId);
  if (updatedResult.modifiedCount === 0) {
    throw new Error("Error shortlisting applicant for job posting");
  }
  return jobPostingDao.findJobPostingById(jobId);
}
