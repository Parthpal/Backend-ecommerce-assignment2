"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ecommerce_controller_1 = require("./ecommerce.controller");
const router = express_1.default.Router();
router.post("/products", ecommerce_controller_1.productControllers.createProduct);
router.get("/products", ecommerce_controller_1.productControllers.getAllProduct);
router.get("/products/:productId", ecommerce_controller_1.productControllers.getProductById);
router.put("/products/:productId", ecommerce_controller_1.productControllers.updateProduct);
router.delete("/products/:productId", ecommerce_controller_1.productControllers.deleteProduct);
//router.get("/products", productControllers.searchProducts);
exports.productRoutes = router;
