import { Diary } from "../models/diary.model.js";

export const entry = async (req, res) => {
    try {
        const { title, body, savedDate, tags } = req.body;

        const newEntry = new Diary({
            title,
            body,
            savedDate,
            tags,
            userID: req.user._id,
        });

        await newEntry.save();
        res.status(201).json({ message: "Diary entry saved successfully" });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const entries = async( req, res) => {
    try {
        const diaries =await Diary.find({userID: req.user._id});        
        return res.status(200).json({
            diaries: diaries,
        });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}


export const updateEntry = async( req, res) => {
    try {
         await Diary.findByIdAndUpdate(req.params.id, req.body, {new: true})      
        return res.status(200).json({ message: "Updated Successfully"});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteEntry = async( req, res) => {
    try {
         await Diary.findByIdAndDelete(req.params.id)      
        return res.status(200).json({ message: "Deleted Successfully"});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}