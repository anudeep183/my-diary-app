import mongoose from "mongoose";

export const dbConnect = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
    }catch(error){
        console.log("Connection Failed",error);
    }
}