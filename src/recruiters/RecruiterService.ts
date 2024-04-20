import { IRecruiter } from "./RecruiterSchema";
import * as recruiterDao from "./RecruiterDao";

export async function createRecruiter(recruiter: IRecruiter): Promise<IRecruiter> {
    const newRecruiter = await recruiterDao.createRecruiter(recruiter);
    return newRecruiter;
}

export async function updateRecruiter(recruiterId: string, updatedRecruiter: IRecruiter): Promise<boolean> {
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

export async function getRecruiters(): Promise<IRecruiter[]> {
    return await recruiterDao.findAllRecruiters();
}

export async function getRecruiterById(recruiterId: string): Promise<IRecruiter | null> {
    return await recruiterDao.findRecruiterById(recruiterId);
}

export async function getRecruitersByFilter(filter): Promise<IRecruiter[] | null> {
    return await recruiterDao.findRecruiterByCriteria(filter);
}
