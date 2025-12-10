import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js"
import diaryRouter from "./routes/diary.route.js"
import { dbConnect } from "./lib/db.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT= process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRouter);
app.use("/api/diary", diaryRouter);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))


    app.get('(*)',(req,res) => {
        res.sendFile(path.join(__dirname,"../frontend", "dist" ,"index.html"));
    })
}

app.listen(PORT,() => {
    console.log("Listening in server PORT: ",PORT);
    dbConnect();
})