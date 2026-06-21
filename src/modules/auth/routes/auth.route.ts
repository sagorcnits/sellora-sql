import express from "express";
import { authController } from "../controllers/auth.controller";

const router = express.Router();

router.post("/auth/register", authController.registerUser);
router.post("/auth/login", authController.loginUser);
router.get("/auth/profile/:id", authController.getProfile);
router.patch("/auth/profile/:id", authController.updateProfile);
router.put("/auth/change-password/:id", authController.changePassword);

export default router;
