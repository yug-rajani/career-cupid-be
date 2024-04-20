/**
 * Import all the routes here.
 */
import express from 'express';
import UserRoutes from './UserRoutes';
import JobPostingRoutes from './JobPostingRoutes'

export const routes = express.Router();


routes.use(UserRoutes);
routes.use(JobPostingRoutes);
