import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoute from "./routes/authRoute.js";
import mealRoute from "./routes/mealRoute.js"
import cors from "cors";


// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express application
const app = express();

app.use(cors({
    origin: "*",
    credentials: true,

}));

app.use(express.json());

app.use("/server/api/auth",authRoute)
app.use("/server/api/meal",mealRoute)

app.get("/",async (req,res)=>{

    res.send("hello world")
    });

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
