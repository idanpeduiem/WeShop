import mongoose,{SchemaTypes} from "mongoose";
import { ObjectID, UUID } from "../utils/types";

const OrderSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true
    },
    items: [
      {
        item: {
          type: ObjectID,
          ref: "item",
          required: true,
        },
        size: {
          type: ObjectID,
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
    address: {
        type: String,
        required: true
    },
    totalPrice: {
      type: Number,
      required: true,
    }
  }, {timestamps: true},
  );

  const Order = mongoose.model("order", OrderSchema);

export default Order;