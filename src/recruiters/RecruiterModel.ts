import mongoose from "mongoose";
import RecruiterSchema, { IRecruiter } from "./RecruiterSchema";

const RecruiterModel = mongoose.model<IRecruiter>("RecruiterModel", RecruiterSchema);

export default RecruiterModel;