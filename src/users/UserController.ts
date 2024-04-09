import { Request, Response } from "express";
import { getErrorMessage } from "../utils/ErrorMessages";
import * as userServices from "./UserService";

export const login = async (req: Request, res: Response) => {
  try {
    const foundUser = await userServices.login(req.body);
    res.status(200).send(foundUser);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const createdUser = await userServices.register(req.body);
    res.status(200).send(createdUser);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const confirmEmail = async (req: Request, res: Response) => {
  try {
    const createdUser = await userServices.register(req.body);
    res.status(200).send(createdUser);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const createdUser = await userServices.register(req.body);
    res.status(200).send(createdUser);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const createdUser = await userServices.register(req.body);
    res.status(200).send(createdUser);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const createdUser = await userServices.register(req.body);
    res.status(200).send(createdUser);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};
