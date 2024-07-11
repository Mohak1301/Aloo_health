import mongoose from "mongoose";

export default async function(){
    try{
        await mongoose.connect(process.env.MongoURI);
        console.log("connected")
    }
    catch(e){
        console.log(e)
    }
}