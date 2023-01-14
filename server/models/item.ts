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
    price: {
      type: Number,
      required: true,
    }
  });

  const Item = mongoose.model("item", ItemSchema);

export default Item;