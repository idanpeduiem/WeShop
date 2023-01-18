import mongoose from "mongoose";

const SizeSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        unique: true
    },
  });

  const Size = mongoose.model("size", SizeSchema);

export default Size;