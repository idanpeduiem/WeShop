import mongoose,{SchemaTypes} from "mongoose";
import { UUID } from "../utils/types";

const OrderSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true
    },
    cart: {
       type:  SchemaTypes.ObjectId,
       required: true,
       ref: 'cart'
    },
    address: {
        type: String,
        required: true
    }
  });

  const Order = mongoose.model("order", OrderSchema);

export default Order;