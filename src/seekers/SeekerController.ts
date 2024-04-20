import { Request, Response } from "express";
import { getErrorMessage } from "../utils/ErrorMessages";
import * as seekerServices from "./SeekerService";
import { ISeeker } from "./SeekerSchema";
import * as userServices from "../users/UserService";

export const createSeeker = async (req: Request, res: Response) => {
    try {
        const seekerData: ISeeker = req.body;

        // TODO: Check if user exists
        const foundUser = await userServices.getUserById(String(seekerData.user));
        if (!foundUser) {
            return res.status(404).send("User not found");
        }

        const createdSeeker = await seekerServices.createSeeker(req.body);
        res.status(200).send(createdSeeker);
    }
    catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

export const updateSeeker = async (req: Request, res: Response) => {
    try {
        const updatedSeeker = await seekerServices.updateSeeker(req.params.id, req.body);
        res.status(200).send(updatedSeeker);
    }
    catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

export const deleteSeeker = async (req: Request, res: Response) => {
    try {
        const deletedSeeker = await seekerServices.deleteSeeker(req.params.id);
        res.status(200).send(deletedSeeker);
    }
    catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

export const getSeekers = async (req: Request, res: Response) => {
    try {
        const seekers = await seekerServices.getSeekers();
        res.status(200).send(seekers);
    }
    catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

export const getSeekerById = async (req: Request, res: Response) => {
    try {
        const seeker = await seekerServices.getSeekerById(req.params.id);
        res.status(200).send(seeker);
    }
    catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

export const getSeekersByFilter = async (req: Request, res: Response) => {
    try {
        const seeker = await seekerServices.getSeekersByFilter(req.query);
        res.status(200).send(seeker);
    }
    catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};