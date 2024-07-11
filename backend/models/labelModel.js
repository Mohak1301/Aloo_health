import mongoose from "mongoose";

const labelModel = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    label: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Label", labelModel);
