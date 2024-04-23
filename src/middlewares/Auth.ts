import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getErrorMessage } from "../utils/ErrorMessages";

export const SECRET_KEY: Secret = process.env.SECRET_KEY;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    throw new Error("Please authenticate");
  }
};

export const decodeToken = async (token) => {
  try {
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    throw new Error("Invalid token");
  }
};

export const getJWTToken = async (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, SECRET_KEY);

    return decoded;
  } catch (err) {
    throw new Error("Please authenticate");
  }
};
