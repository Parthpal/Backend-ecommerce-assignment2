import express from "express";
import { productControllers } from "./ecommerce.controller";

const router = express.Router();

router.post("/products", productControllers.createProduct);
router.get("/products", productControllers.getAllProduct);
router.get("/products/:productId", productControllers.getProductById);
router.put("/products/:productId", productControllers.updateProduct);
router.delete("/products/:productId", productControllers.deleteProduct);
//router.get("/products", productControllers.searchProducts);

export const productRoutes = router;
