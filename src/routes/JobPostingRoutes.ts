import * as jobPostingController from "../jobPostings/JobPostingController";
import { Router } from "express";


const router = Router();

router.post("/jobPostings", jobPostingController.createJobPosting);
router.get("/jobPostings", jobPostingController.getAllJobPostings);
router.get("/jobPostings/:jobId", jobPostingController.getJobPostingById);
router.put("/jobPostings/:jobId", jobPostingController.updateJobPosting);
router.delete("/jobPostings/:jobId", jobPostingController.deleteJobPosting);

export default router;
