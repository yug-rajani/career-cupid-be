import recruiterModel from "./RecruiterModel";
import { IRecruiter } from "./RecruiterSchema";

export const createRecruiter = (recruiter: IRecruiter) => {
  delete recruiter._id;
  return recruiterModel.create(recruiter);
};

export const findAllRecruiters = () => recruiterModel.find();
export const findRecruiterById = (recruiterId: String) => recruiterModel.findById(recruiterId);
export const updateRecruiter = (recruiterId: String, recruiter: IRecruiter) =>
  recruiterModel.updateOne({ _id: recruiterId }, { $set: recruiter });
export const deleteRecruiter = (recruiterId: String) =>
  recruiterModel.deleteOne({ _id: recruiterId });
