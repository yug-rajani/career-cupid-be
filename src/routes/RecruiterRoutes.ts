import * as recruiterController from '../recruiters/RecruiterController';
import { Router } from 'express';

const router = Router();

router.post('/recruiters', recruiterController.createRecruiter);
router.put('/recruiters/:recruiterId', recruiterController.updateRecruiter);
router.delete('/recruiters/:recruiterId', recruiterController.deleteRecruiter);
router.get('/recruiters', recruiterController.getRecruiters);
router.get('/recruiters/:recruiterId', recruiterController.getRecruiterById);
router.get('/recruiters', recruiterController.getRecruitersByFilter);

export default router;
