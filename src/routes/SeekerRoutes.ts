import * as seekerController from '../seekers/SeekerController';
import { Router } from 'express';

const router = Router();

router.post('/seekers', seekerController.createSeeker);
router.put('/seekers/:seekerId', seekerController.updateSeeker);
router.delete('/seekers/:seekerId', seekerController.deleteSeeker);
router.get('/seekers', seekerController.getSeekers);
router.get('/seekers/:seekerId', seekerController.getSeekerById);

export default router;