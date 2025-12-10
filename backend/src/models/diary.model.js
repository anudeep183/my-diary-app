import mongoose from 'mongoose'

const DiarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    savedDate: {
        type: Date,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export const Diary = mongoose.model("Diary", DiarySchema);