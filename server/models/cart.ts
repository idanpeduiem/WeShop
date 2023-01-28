import mongoose from "mongoose";
import { ObjectID, UUID } from "../utils/types";

const CartSchema = new mongoose.Schema({
    userId: {
      type: String,
       required: true,
     },
    items: [{
      itemId: {
       type: ObjectID,
       ref: 'item',
       required: true
    },
    items: [
      {
        itemId: {
          type: ObjectID,
          ref: "item",
          required: true,
        },
        size: {
          type: String,
          ref: "size",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("cart", CartSchema);

export default Cart;
