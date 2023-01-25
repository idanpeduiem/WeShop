import mongoose from "mongoose";
import { ObjectID } from "../utils/types";

const ItemStockSchema = new mongoose.Schema({
   item: {
    type: ObjectID,
    required: true,
    ref: 'item'
   },
   size: {
    type: ObjectID,
    required: true,
    ref: 'size'
   },
   qunatity: {
    type: Number,
    required: true
   }
  });

  const ItemStock = mongoose.model("item-stock", ItemStockSchema);

export default ItemStock;
