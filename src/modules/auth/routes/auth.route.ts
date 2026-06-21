import express from "express";
import { authController } from "../controllers/auth.controller";

const router = express.Router();

router.post("/auth/register", authController.registerUser);
router.post("/auth/login", authController.loginUser);

export default router;
