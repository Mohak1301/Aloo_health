import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      reuired: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userModel);
