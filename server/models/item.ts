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
    categoty: {
      type: ObjectID,
      required: true,
      ref: 'itemCategory'
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