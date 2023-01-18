import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        unique: true,
    },
  });

  const Department = mongoose.model("department", DepartmentSchema);

export default Department;