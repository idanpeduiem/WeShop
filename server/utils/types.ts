import mongoose, { MongooseOptions } from "mongoose";

export const ObjectID = mongoose.Schema.Types.ObjectId;
export const UUID = mongoose.Schema.Types.UUID;



declare global {
  namespace Express {
    export interface Request {
      userId?: string
    }
  }
}