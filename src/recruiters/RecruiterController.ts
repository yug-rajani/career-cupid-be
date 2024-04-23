import { Request, Response } from "express";
import { getErrorMessage } from "../utils/ErrorMessages";
import * as recruiterService from "./RecruiterService";
import { IRecruiter } from "./RecruiterSchema";
import * as userServices from "../users/UserService";
import { getJWTToken } from "../middlewares/Auth";

export const createRecruiter = async (req: Request, res: Response) => {
  try {
    const recruiterData: IRecruiter = req.body;

    // Validate state and country fields
    if (recruiterData.state.length !== 2 || recruiterData.country.length !== 2) {
      return res.status(400).send("State and country must be two characters long");
    }

    // Check if user exists
    const foundUser = await userServices.getUserById(String(recruiterData.user));
    if (!foundUser) {
      return res.status(404).send("User not found");
    }
    const createdRecruiter = await recruiterService.createRecruiter(req.body);
    res.status(200).send(createdRecruiter);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const updateRecruiter = async (req: Request, res: Response) => {
  try {
    const updatedRecruiter = await recruiterService.updateRecruiter(req.params.id, req.body);
    res.status(200).send(updatedRecruiter);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const deleteRecruiter = async (req: Request, res: Response) => {
  try {
    const deletedRecruiter = await recruiterService.deleteRecruiter(req.params.id);
    res.status(200).send(deletedRecruiter);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getRecruiters = async (req: Request, res: Response) => {
  try {
    const recruiters = await recruiterService.getRecruiters(req.query);
    res.status(200).send(recruiters);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getRecruiterById = async (req: Request, res: Response) => {
  try {
    const recruiter = await recruiterService.getRecruiterById(req.params.id);
    res.status(200).send(recruiter);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getRecruitersByFilter = async (req: Request, res: Response) => {
  try {
    const recruiter = await recruiterService.getRecruitersByFilter(req.query);
    res.status(200).send(recruiter);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const approveRecruiterById = async (req: Request, res: Response) => {
  try {
    const token = await getJWTToken(req, res);
    const approvedRecruiter = await recruiterService.approveRecruiterById(
      token,
      req.params.recruiterId
    );
    res.status(200).send(approvedRecruiter);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getMyRecruiter = async (req: Request, res: Response) => {
  try {
    if (req.header("Authorization") === undefined || req.header("Authorization") === null)
      return {};
    const token = await getJWTToken(req, res);
    const recruiter = await recruiterService.getMyRecruiter(token);
    res.status(200).send(recruiter);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};
