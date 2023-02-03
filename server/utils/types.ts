import mongoose, { MongooseOptions } from "mongoose";

export const ObjectID = mongoose.Schema.Types.ObjectId;
export const UUID = mongoose.Schema.Types.UUID;

export type CartItem = {
  item: {
      _id:string,
      description: string,
      price: number
  },
  size: {
      _id: string,
      description: string,
  },
  quantity: number,
}

declare global {
  namespace Express {
    export interface Request {
      userId?: string
    }
  }
}