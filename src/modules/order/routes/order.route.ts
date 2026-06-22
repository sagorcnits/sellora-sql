import express from "express";
import { orderController } from "../controllers/order.controller";

const router = express.Router();

router.post("/orders", orderController.creteOrder);
router.get("/orders", orderController.getOrders);

export default router;
