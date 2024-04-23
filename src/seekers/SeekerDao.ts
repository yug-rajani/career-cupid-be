import seekerModel from "./SeekerModel";
import { ISeeker } from "./SeekerSchema";

export const createSeeker = (seeker: ISeeker) => {
  delete seeker._id;
  return seekerModel.create(seeker);
};

export const findAllSeekers = (queryParams) => {
  let criterias = getCriterias(queryParams);
  return seekerModel.find(criterias);
};
export const findSeekerById = (seekerId: String) => seekerModel.findById(seekerId);

export const updateSeeker = (seekerId: String, seeker: ISeeker) =>
  seekerModel.updateOne({ _id: seekerId }, { $set: seeker });

export const deleteSeeker = (seekerId: String) => seekerModel.deleteOne({ _id: seekerId });

export const findSeekerByCriteria = (criteria: Object) => seekerModel.find(criteria);

const getCriterias = (queryParams): Object => {
  let queries = {};

  if (queryParams.emails) {
    const emailsArr = queryParams.emails.split(",");
    queries["email"] = { $in: emailsArr };
  }

  return queries;
};
