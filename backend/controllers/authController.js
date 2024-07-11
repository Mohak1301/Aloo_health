import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedpassword = await hashPassword(password);
    const user = new userModel({
      name,
      email,
      password: hashedpassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    res.status(500).json({ message: "Error in registering user", e });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.status(404).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res
      .status(200)
      .json({
        message: "Logged in successfully",
        name: user.name,
        email: user.email,
        token: token,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in logging in user",
      error,
    });
  }
};
