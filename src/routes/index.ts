/**
 * Import all the routes here.
 */
import express from 'express';
import UserRoutes from './UserRoutes';
import JobPostingRoutes from './JobPostingRoutes'
import RecruiterRoutes from './RecruiterRoutes';
import SeekerRoutes from './SeekerRoutes';

export const routes = express.Router();

routes.use(UserRoutes);
routes.use(JobPostingRoutes);
routes.use(RecruiterRoutes);
routes.use(SeekerRoutes);
