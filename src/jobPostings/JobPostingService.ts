import { IJobPosting } from "./JobPostingSchema";
import * as jobPostingDao from "./JobPostingDao";



export async function createJobPosting(jobPosting: IJobPosting): Promise<IJobPosting> {
  const newJobPosting = await jobPostingDao.createJobPosting(jobPosting);
  return newJobPosting;
}


export async function getAllJobPostings(): Promise<IJobPosting[]> {
  const jobPostings = await jobPostingDao.findAllJobPostings();
  return jobPostings;
}


export async function getJobPostingById(jobId: string): Promise<IJobPosting | null> {
  const jobPosting = await jobPostingDao.findJobPostingById(jobId);
  return jobPosting;
}

export async function updateJobPosting(jobId: string, updatedJobPosting: IJobPosting): Promise<IJobPosting | null> {
  const updatedResult = await jobPostingDao.updateJobPosting(jobId, updatedJobPosting);
  if (updatedResult.modifiedCount === 0) {

    return null;
  }
  return updatedJobPosting;
}


export async function deleteJobPosting(jobId: string): Promise<boolean> {
  const DeleteResult = await jobPostingDao.deleteJobPosting(jobId);

  if (DeleteResult.deletedCount && DeleteResult.deletedCount > 0) {
    return true;
  } else {
    return false;
  }
}

export async function getJobPostingsByFilter(filter: Record<string, any>): Promise<IJobPosting[]> {
  const jobPostings = await jobPostingDao.findJobPostingsByFilter(filter);
  return jobPostings;
}