/**
 * Import all the routes here.
 */
import express from 'express';
import UserRoutes from './UserRoutes';

export const routes = express.Router();


routes.use(UserRoutes);