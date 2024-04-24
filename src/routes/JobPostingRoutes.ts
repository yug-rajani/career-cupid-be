import * as jobPostingController from "../jobPostings/JobPostingController";
import { Router } from "express";


const router = Router();

router.post("/jobPostings", jobPostingController.createJobPosting);
router.get("/jobPostings", jobPostingController.getAllJobPostings);
router.get("/jobPostings/:jobId", jobPostingController.getJobPostingById);
router.put("/jobPostings/:jobId", jobPostingController.updateJobPosting);
router.delete("/jobPostings/:jobId", jobPostingController.deleteJobPosting);
router.post("/jobPostings/:jobId/applicants", jobPostingController.addApplicantToJobPosting);
router.post("/jobPostings/:jobId/shortlist-applicants", jobPostingController.shortlistApplicantForJobPosting);


export default router;
