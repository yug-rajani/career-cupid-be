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

const getCriterias = (queryParams): Object => {
  let queries = {};

  if (queryParams.email) {
    queries["email"] = queryParams.email;
  }

  if (queryParams.user) {
    queries["user"] = queryParams.user;
  }

  if (queryParams.userIds) {
    queries["user"] = { $in: queryParams.userIds.split(",") };
  }

  if (queryParams.seekerIds) {
    queries["_id"] = { $in: queryParams.seekerIds.split(",") };
  }

  if (queryParams.keyword) {
    queries["$text"] = { $search: queryParams.keyword };
  }

  return queries;
};
