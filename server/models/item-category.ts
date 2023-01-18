import mongoose from "mongoose";

const ItemCategorySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        unique: true,
    },
  });

  const ItemCategory = mongoose.model("item-category", ItemCategorySchema);

export default ItemCategory;