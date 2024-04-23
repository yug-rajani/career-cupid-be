import { Request, Response } from "express";
import { getErrorMessage } from "../utils/ErrorMessages";
import * as seekerService from "./SeekerService";
import { ISeeker } from "./SeekerSchema";
import * as userServices from "../users/UserService";
import { getJWTToken } from "../middlewares/Auth";

export const createSeeker = async (req: Request, res: Response) => {
  try {
    const seekerData: ISeeker = req.body;

    // Validate state and country fields
    if (seekerData.state.length !== 2 || seekerData.country.length !== 2) {
      return res.status(400).send("State and country must be two characters long");
    }

    // Check if user exists
    const foundUser = await userServices.getUserById(String(seekerData.user));
    if (!foundUser) {
      return res.status(404).send("User not found");
    }

    const createdSeeker = await seekerService.createSeeker(req.body);
    res.status(200).send(createdSeeker);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const updateSeeker = async (req: Request, res: Response) => {
  try {
    const updatedSeeker = await seekerService.updateSeeker(req.params.id, req.body);
    res.status(200).send(updatedSeeker);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const deleteSeeker = async (req: Request, res: Response) => {
  try {
    const deletedSeeker = await seekerService.deleteSeeker(req.params.id);
    res.status(200).send(deletedSeeker);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getSeekers = async (req: Request, res: Response) => {
  try {
    const seekers = await seekerService.getSeekers(req.query);
    res.status(200).send(seekers);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getSeekerById = async (req: Request, res: Response) => {
  try {
    const seeker = await seekerService.getSeekerById(req.params.id);
    res.status(200).send(seeker);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getMySeeker = async (req: Request, res: Response) => {
  try {
    if (req.header("Authorization") === undefined || req.header("Authorization") === null)
      return {};
    const token = await getJWTToken(req, res);
    const seeker = await seekerService.getMySeeker(token);
    res.status(200).send(seeker);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};
