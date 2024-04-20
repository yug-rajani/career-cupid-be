import seekerModel from "./SeekerModel";
import { ISeeker } from "./SeekerSchema";

export const createSeeker = (seeker: ISeeker) => {
  delete seeker._id;
  return seekerModel.create(seeker);
};

export const findAllSeekers = () => seekerModel.find();
export const findSeekerById = (seekerId: String) => seekerModel.findById(seekerId);
export const updateSeeker = (seekerId: String, seeker: ISeeker) =>
  seekerModel.updateOne({ _id: seekerId }, { $set: seeker });
export const deleteSeeker = (seekerId: String) => seekerModel.deleteOne({ _id: seekerId });
