import recruiterModel from "./RecruiterModel";
import { IRecruiter } from "./RecruiterSchema";

export const createRecruiter = (recruiter: IRecruiter) => {
  delete recruiter._id;
  return recruiterModel.create(recruiter);
};

export const findAllRecruiters = () =>
  recruiterModel.find();

export const findRecruiterById = (recruiterId: string) =>
  recruiterModel.findById(recruiterId);

export const updateRecruiter = (recruiterId: string, recruiter: IRecruiter) =>
  recruiterModel.updateOne({ _id: recruiterId }, { $set: recruiter });

export const deleteRecruiter = (recruiterId: string) =>
  recruiterModel.deleteOne({ _id: recruiterId });

export const findRecruiterByCriteria = (criteria) =>
  recruiterModel.find(criteria);