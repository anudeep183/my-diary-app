import express from "express";;
import { signup, login, logout, checkAuth, update , deactivateAccount } from "../controllers/auth.controller.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";

const router=express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/check", ProtectRoute, checkAuth);

router.put("/update", ProtectRoute, update );

router.delete("/delete", ProtectRoute, deactivateAccount);


export default router;