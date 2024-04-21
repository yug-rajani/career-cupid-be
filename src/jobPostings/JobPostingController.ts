import * as jobPostingServices from './JobPostingService';
import { Request, Response } from "express";
import { getErrorMessage } from "../utils/ErrorMessages";
import * as seekerServices from "../seekers/SeekerService";


export const updateJobPosting = async (req: Request, res: Response) => {
    const { jobId } = req.params;
    try {
      const { applicant } = req.body;
      
      for (const seekerId of applicant) {
        const seeker = await seekerServices.getSeekerById(seekerId);
        if (!seeker) {
          throw new Error(`Invalid seeker ID: ${seekerId}`);
        }
      }
  
      const updatedJobPosting = await jobPostingServices.updateJobPosting(jobId, req.body);
      res.status(200).send(updatedJobPosting);
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
  };
  

export const getAllJobPostings = async (req: Request, res: Response) => {
  try {
    const jobPostings = await jobPostingServices.getAllJobPostings();
    res.status(200).send(jobPostings);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }

};

export const deleteJobPosting = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  try {
    const status = await jobPostingServices.deleteJobPosting(jobId);
    res.status(200).send(status);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }

};

export const getJobPostingById = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  try {
    const jobPosting = await jobPostingServices.getJobPostingById(jobId);
    res.status(200).send(jobPosting);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const createJobPosting = async (req, res) => {
    try {
      const { applicant } = req.body;
    
      for (const seekerId of applicant) {
        const seeker = await seekerServices.getSeekerById(seekerId);
        if (!seeker) {
          throw new Error(`Invalid seeker ID: ${seekerId}`);
        }
      }
  
      const jobPosting = await jobPostingServices.createJobPosting(req.body);
      res.status(200).send(jobPosting);
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
  };
  

export const getJobPostingsByFilter = async (req: Request, res: Response) => {
  const filter = req.body;
  try {
    const jobPostings = await jobPostingServices.getJobPostingsByFilter(filter);
    res.status(200).send(jobPostings);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};



