import JWT from "jsonwebtoken";
import usermodel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    console.log(req.headers.authorization)
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    const {_id} = decode;
    usermodel.findById(_id).then(userdata=>{
      req.user=userdata;
      next();

    })
  } catch (error) {
    console.log(error);
  }
};




