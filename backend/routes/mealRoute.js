import express from "express";
import { findallmealController ,searchmealController} from "../controllers/mealController.js";

const router = express.Router()

router.get("/findmeal/:currentpage/:maxlimit",findallmealController)
router.get("/searchmeal/:id",searchmealController)
export default router;