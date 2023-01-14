import mongoose,{SchemaTypes} from "mongoose";

const OrderSchema = new mongoose.Schema({
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