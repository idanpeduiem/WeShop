import mongoose, {Schema} from "mongoose";
import { ObjectID, UUID } from "../utils/types";

const WishListSchema = new mongoose.Schema({
    userId: {
      type: String,
       required: true,
     },
    items: [{
       type: ObjectID,
       ref: 'item',
       required: true
    }]
})

  const WishList = mongoose.model("wish-list", WishListSchema);

export default WishList;
