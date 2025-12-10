import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const ProtectRoute = async(req, res, next)=>{

    try{
    const token= req.cookies.jwt;
    if(!token){
        return res.status(401).json({message:"Unauthorised User"});
    }

    const decoded= jwt.verify(token, process.env.SECRET_KEY);
    if(!decoded){
        return res.status(401).json({message:"Unauthorised User"});
    }

    const user= await User.findById(decoded.id).select("-password");
    if(!user){
        return res.status(404).json({message:"Invalid User"});
    }

    req.user=user;
    next();
    }

    catch(error){
        console.log("Error in ProtectRoute middleware: ", error.message);
        res.status(500).json({ message: "Server error" });   
    }
}