import mongoose from "mongoose";

const drinkModel = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },

  title: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
}
,
  {
    timestamps: true,
  });


export default mongoose.model("Drink",drinkModel);