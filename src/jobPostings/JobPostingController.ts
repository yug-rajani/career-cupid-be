import * as jobPostingService from "./JobPostingService";
import { Request, Response } from "express";
import { getErrorMessage } from "../utils/ErrorMessages";
import * as seekerServices from "../seekers/SeekerService";

export const updateJobPosting = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  try {
    const { applicants } = req.body;

    for (const seekerId of applicants) {
      const seeker = await seekerServices.getSeekerById(seekerId);
      if (!seeker) {
        throw new Error(`Invalid seeker ID: ${seekerId}`);
      }
    }

    const updatedJobPosting = await jobPostingService.updateJobPosting(jobId, req.body);
    res.status(200).send(updatedJobPosting);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getAllJobPostings = async (req: Request, res: Response) => {
  try {
    const jobPostings = await jobPostingService.getAllJobPostings(req.query);
    res.status(200).send(jobPostings);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const deleteJobPosting = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  try {
    const status = await jobPostingService.deleteJobPosting(jobId);
    res.status(200).send(status);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getJobPostingById = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  try {
    const jobPosting = await jobPostingService.getJobPostingById(jobId);
    res.status(200).send(jobPosting);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const createJobPosting = async (req, res) => {
  try {
    const jobPosting = await jobPostingService.createJobPosting(req.body);
    res.status(200).send(jobPosting);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const addApplicantToJobPosting = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  try {
    const { applicantId } = req.body;
    const status = await jobPostingService.addApplicantToJobPosting(jobId, applicantId);
    res.status(200).send(status);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const shortlistApplicantForJobPosting = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  try {
    const { applicantId } = req.body;
    const status = await jobPostingService.shortlistApplicantForJobPosting(jobId, applicantId);
    res.status(200).send(status);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};
