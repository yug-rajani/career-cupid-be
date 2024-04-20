import { Request, Response } from "express";
import { getErrorMessage } from "../utils/ErrorMessages";
import * as recruiterServices from "./RecruiterService";

export const createRecruiter = async (req: Request, res: Response) => {
    try {
        // TODO: Check if user exists
        const createdRecruiter = await recruiterServices.createRecruiter(req.body);
        res.status(200).send(createdRecruiter);
    }
    catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

export const updateRecruiter = async (req: Request, res: Response) => {
    try {
        const updatedRecruiter = await recruiterServices.updateRecruiter(req.params.id, req.body);
        res.status(200).send(updatedRecruiter);
    }
    catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

export const deleteRecruiter = async (req: Request, res: Response) => {
    try {
        const deletedRecruiter = await recruiterServices.deleteRecruiter(req.params.id);
        res.status(200).send(deletedRecruiter);
    }
    catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

export const getRecruiters = async (req: Request, res: Response) => {
    try {
        const recruiters = await recruiterServices.getRecruiters();
        res.status(200).send(recruiters);
    }
    catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

export const getRecruiterById = async (req: Request, res: Response) => {
    try {
        const recruiter = await recruiterServices.getRecruiterById(req.params.id);
        res.status(200).send(recruiter);
    }
    catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

export const getRecruitersByFilter = async (req: Request, res: Response) => {
    try {
        const recruiter = await recruiterServices.getRecruitersByFilter(req.query);
        res.status(200).send(recruiter);
    }
    catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};