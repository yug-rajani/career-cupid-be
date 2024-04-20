import seekerModel from "./SeekerModel";
import { ISeeker } from "./SeekerSchema";

export const createSeeker = (seeker: ISeeker) => {
  delete seeker._id;
  return seekerModel.create(seeker);
};

export const findAllSeekers = () => seekerModel.find();

export const findSeekerById = (seekerId) =>
  seekerModel.findById(seekerId);

export const updateSeeker = (seekerId, seeker: ISeeker) =>
  seekerModel.updateOne({ _id: seekerId }, { $set: seeker });

export const deleteSeeker = (seekerId) =>
  seekerModel.deleteOne({ _id: seekerId });

export const findSeekerByCriteria = (criteria) =>
  seekerModel.find(criteria);