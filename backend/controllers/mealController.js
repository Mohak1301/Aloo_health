import mealModel from "../models/mealModel.js";
import drinkModel from "../models/drinkModel.js";
import labelModel from "../models/labelModel.js";



export  const findallmealController = async (req, res) => {
  try {
    const page = parseInt(req.params.currentpage) ;
    const limit = parseInt(req.params.maxlimit );


    const skip = (page - 1) * limit;

    const totalItems = await mealModel.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    const foods = await mealModel.find()
      .skip(skip)
      .limit(limit)
      .populate("labels")
      .populate("drinks")

    res.status(200).json({
      page,
      limit,
      totalPages,
      totalItems,
      foods,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in meal api", error: error });
  }
};


export const searchmealController = async(req,res)=>{
    try {
        const meal = await mealModel.findOne({_id : req.params.id})
           if(!meal) {
            return res.status(404).json({message : "meal not found" })
           }
           res.status(200).json({meal})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
          message : "error in search ",
          error,
        });
    }
}