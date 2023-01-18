import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    personalId:{
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
  });

  const User = mongoose.model("user", UserSchema);

export default User;