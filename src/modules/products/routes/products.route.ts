import express from "express";
import { productsController } from "../controllers/products.controller";

const router = express.Router();

router.get("/products", productsController.getProducts);
router.get("/products/:id", productsController.getProductById);

export default router;
