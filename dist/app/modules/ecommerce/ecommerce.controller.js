"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productControllers = void 0;
const ecommerce_service_1 = require("./ecommerce.service");
const ecommere_validation_1 = __importDefault(require("./ecommere.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //  console.log(req.body);
    const products = req.body;
    console.log(products);
    const { error, value } = ecommere_validation_1.default.validate(products);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Validation error",
            error: error.details, // Provide more detailed error information
        });
    }
    try {
        const result = yield ecommerce_service_1.productServices.createProductIntoDB(value);
        return res.status(200).json({
            success: true,
            message: "Product is created successfully",
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the product",
            error: err.message,
        });
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    try {
        if (searchTerm) {
            // Perform search based on searchTerm
            const products = yield ecommerce_service_1.productServices.searchProductsInDB(searchTerm.toString());
            res.json({
                success: true,
                message: `Products matching search term '${searchTerm}' fetched successfully!`,
                data: products,
            });
        }
        else {
            // Retrieve all products
            const products1 = yield ecommerce_service_1.productServices.getAllProductFromDB();
            res.json({
                success: true,
                message: "Products fetched successfully!",
                data: products1,
            });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const product = yield ecommerce_service_1.productServices.getProductByIdFromDB(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: product,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the product",
            error: err.message,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const { error, value } = ecommere_validation_1.default.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Validation error",
            error: error.details,
        });
    }
    try {
        const updatedProduct = yield ecommerce_service_1.productServices.updateProductInDB(productId, value);
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: updatedProduct,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the product",
            error: err.message,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const deletedProduct = yield ecommerce_service_1.productServices.deleteProductFromDB(productId);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the product",
            error: err.message,
        });
    }
});
const searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    if (typeof searchTerm !== "string") {
        return res.status(400).json({
            success: false,
            message: "Invalid search term provided",
        });
    }
    try {
        const products = yield ecommerce_service_1.productServices.searchProductsInDB(searchTerm);
        return res.status(200).json({
            success: true,
            message: `Products matching search term '${searchTerm}' fetched successfully!`,
            data: products,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while searching for products",
            error: err.message,
        });
    }
});
exports.productControllers = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts,
};
