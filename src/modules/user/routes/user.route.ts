import express from "express";
import { userController } from "../controllers/user.controller";

const router = express.Router();

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.delete("/users/:id", userController.deleteUser);

export default router;
