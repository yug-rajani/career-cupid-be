import * as jobPostingController from "../jobPostings/JobPostingController";
import { Router } from "express";


const router = Router();

router.post("/jobPosting", jobPostingController.createJobPosting);
router.get("/jobPosting", jobPostingController.getAllJobPostings);
router.get("/jobPosting/:jobId", jobPostingController.getJobPostingById);
router.put("/jobPosting/:jobId", jobPostingController.updateJobPosting);
router.delete("/jobPosting/:jobId", jobPostingController.deleteJobPosting);

export default router;
