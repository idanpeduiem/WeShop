import mongoose, { Document } from "mongoose";

interface User {
  personalId: string;
  fullName: string;
  email: string;
}

const UserSchema = new mongoose.Schema<User>({
  personalId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<User>("users", UserSchema);

export default User;
