import recruiterModel from "./RecruiterModel";
import { IRecruiter } from "./RecruiterSchema";

export const createRecruiter = (recruiter: IRecruiter) => {
  delete recruiter._id;
  return recruiterModel.create(recruiter);
};

export const findAllRecruiters = (queryParams) => {
  let criteria = getCriteria(queryParams);
  return recruiterModel.find(criteria);
};

export const findRecruiterById = (recruiterId: string) => recruiterModel.findById(recruiterId);

export const updateRecruiter = (recruiterId: string, recruiter: IRecruiter) =>
  recruiterModel.updateOne({ _id: recruiterId }, { $set: recruiter });

export const deleteRecruiter = (recruiterId: string) =>
  recruiterModel.deleteOne({ _id: recruiterId });

export const findRecruiterByCriteria = (criteria) => recruiterModel.find(criteria);

export const approveRecruiterById = (recruiterId: string) =>
  recruiterModel.updateOne({ _id: recruiterId }, { $set: { approved: true } });

const getCriteria = (queryParams): Object => {
  let queries = {};

  if (queryParams.userIds) {
    queries["user"] = { $in: queryParams.userIds.split(",")};
  }

  if (queryParams.emails) {
    const emailsArr = queryParams.emails.split(",");
    queries["email"] = { $in: emailsArr };
  }

  if (queryParams.keyword) {
    queries["$text"] = { $search: queryParams.keyword };
  }

  return queries;
};
