import mongoose from "mongoose";
import SeekerSchema, { ISeeker } from "./SeekerSchema";

const SeekerModel = mongoose.model<ISeeker>("SeekerModel", SeekerSchema);

export default SeekerModel;
