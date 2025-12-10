import express from 'express';
import { entry, entries, updateEntry, deleteEntry } from '../controllers/diary.controller.js';
import { ProtectRoute } from '../middleware/auth.middleware.js';

const router =  express.Router();

router.post("/entry", ProtectRoute, entry)

router.get("/entries", ProtectRoute, entries)

router.put("/entries/:id", ProtectRoute, updateEntry)

router.delete("/deleteEntry/:id", ProtectRoute, deleteEntry)

export default router;