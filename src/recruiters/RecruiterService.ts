import { IRecruiter } from "./RecruiterSchema";
import * as recruiterDao from "./RecruiterDao";
import { decodeToken } from "../middlewares/Auth";

export async function createRecruiter(recruiter: IRecruiter): Promise<IRecruiter> {
  const newRecruiter = await recruiterDao.createRecruiter(recruiter);
  return newRecruiter;
}

export async function updateRecruiter(
  recruiterId: string,
  updatedRecruiter: IRecruiter
): Promise<boolean> {
  try {
    await recruiterDao.updateRecruiter(recruiterId, updatedRecruiter);
    return true;
  } catch (error) {
    console.error("Error updating recruiter:", error);
    return false;
  }
}

export async function deleteRecruiter(recruiterId: string): Promise<boolean> {
  try {
    await recruiterDao.deleteRecruiter(recruiterId);
    return true;
  } catch (error) {
    console.error("Error deleting recruiter:", error);
    return false;
  }
}

export async function getRecruiters(queryParams): Promise<IRecruiter[]> {
  return await recruiterDao.findAllRecruiters(queryParams);
}

export async function getRecruiterById(recruiterId: string): Promise<IRecruiter | null> {
  return await recruiterDao.findRecruiterById(recruiterId);
}

export async function getRecruitersByFilter(filter): Promise<IRecruiter[] | null> {
  return await recruiterDao.findRecruiterByCriteria(filter);
}

export async function approveRecruiterById(token, recruiterId: string): Promise<IRecruiter> {
  // Verify token
  const role = token.role;

  if (!role || role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const status = await recruiterDao.approveRecruiterById(recruiterId);
  console.log(recruiterId);
  return await recruiterDao.findRecruiterById(recruiterId);
}

export const getMyRecruiter = async (token): Promise<IRecruiter | null> => {
  const userId = token.userId;
  const recruiters = await getRecruiters({ userIds: userId });
  return recruiters && recruiters.length > 0 ? recruiters[0] : null;
};
