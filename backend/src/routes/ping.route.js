import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/ping", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).send("OK");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
