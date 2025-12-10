import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const {  email, password } = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(password, salt);

        const newUser = User({
            email,
            password: hashedPass
        })

        await newUser.save();

        const token = jwt.sign({
            id: newUser._id
        }, process.env.SECRET_KEY, { expiresIn: "1d" });

        return res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV==="production",
            sameSite: "strict",
            maxAge: 24*60*60*1000
        }).status(200).json({ 
            message: "user registration successful",
            user: {
                id: newUser._id,
                email: newUser.email
            }
        })
        
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "server error" });
    }
}

export const login = async(req, res) => {
    try{
        const {email, password} = req.body;

        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPassCrct = await bcryptjs.compare(password, existUser.password);
        if(!isPassCrct){
            return res.status(400).json({ message: "Invalid Password" });
        }

        const token = jwt.sign({
            id: existUser._id
        }, process.env.SECRET_KEY, { expiresIn: "1d" });

        return res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV==="production",
            sameSite: "strict",
            maxAge: 24*60*60*1000
        }).status(200).json({ 
            message: "user login successful",
            user: {
                id: existUser._id,
                email: existUser.email
            }
        })
        

    }catch(error){
        console.log(error.message);
        res.status(500).json({ message: "server error" });
    }
}

export const logout = (req, res) => {
    try{
        res.cookie("jwt","", {maxAge:0});
        res.status(201).json({ message: "logged out successfully" });
        
    }catch(error){
        console.log(error.message);
        res.status(500).json({ message: "server error" });
    }
}

export const checkAuth = (req,res) =>{
    
    try{
        res.status(201).json(req.user)
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:"server error"});
    }
}

export const update = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcryptjs.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}


export const deactivateAccount = async (req, res) => {
    try {
        const { password } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        await User.findByIdAndDelete(userId);

        res.cookie("jwt", "", { maxAge: 0 });

        res.status(200).json({ message: "Account deactivated successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}