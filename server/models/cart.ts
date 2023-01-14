import mongoose from "mongoose";
import { ObjectID } from "../utils/types";

const CartSchema = new mongoose.Schema({
    user: {
      type: ObjectID,
       required: true,
       ref: 'user'
     },
    items: [{
      itemId: {
       type: ObjectID,
       ref: 'item',
       required: true
    },
    size: {
       type: ObjectID,
       ref: 'size',
       required: true
    },
    quantity: {
       type: Number,
       required: true,
       min: 1,
       },
     }],
    totalCost: {
        type: Number,
        required: true,
        default: 0
      },
    checkoutTime: {
        type: Date,
    }
})

  const Cart = mongoose.model("cart", CartSchema);

export default Cart;