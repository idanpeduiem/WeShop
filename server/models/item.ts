import mongoose from "mongoose";
import { ObjectID } from "../utils/types";

const ItemSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    department: {
      type: ObjectID,
      required: true,
      ref: 'department'
    },
    category: {
      type: ObjectID,
      required: true,
      ref: 'item-category'
    },
    price: {
      type: Number,
      required: true,
    },
   image: {
    type: String,
    required: true
   }
  });

  const Item = mongoose.model("item", ItemSchema);

export default Item;