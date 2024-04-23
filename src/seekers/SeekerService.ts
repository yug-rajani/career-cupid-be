import { ISeeker } from "./SeekerSchema";
import * as seekerDao from "./SeekerDao";

export async function createSeeker(seeker: ISeeker): Promise<ISeeker> {
    const newSeeker = await seekerDao.createSeeker(seeker);
    return newSeeker;
}

export async function updateSeeker(seekerId: string, updatedSeeker: ISeeker): Promise<boolean> {
    try {
        await seekerDao.updateSeeker(seekerId, updatedSeeker);
        return true;
    } catch (error) {
        console.error("Error updating seeker:", error);
        return false;
    }
}

export async function deleteSeeker(seekerId: string): Promise<boolean> {
    try {
        await seekerDao.deleteSeeker(seekerId);
        return true;
    } catch (error) {
        console.error("Error deleting seeker:", error);
        return false;
    }
}

export async function getSeekers(queryParams): Promise<ISeeker[]> {
    return await seekerDao.findAllSeekers(queryParams);
}

export async function getSeekerById(seekerId: string): Promise<ISeeker | null> {
    return await seekerDao.findSeekerById(seekerId);
}


