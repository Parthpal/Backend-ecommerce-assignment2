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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const ecommerce_model_1 = require("./ecommerce.model");
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ecommerce_model_1.ProductSchemaModel.create(productData);
    return result;
});
const getAllProductFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ecommerce_model_1.ProductSchemaModel.find({});
    return result;
});
const getProductByIdFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ecommerce_model_1.ProductSchemaModel.findById(productId);
});
const updateProductInDB = (productId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ecommerce_model_1.ProductSchemaModel.findByIdAndUpdate(productId, productData, {
        new: true,
    });
});
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ecommerce_model_1.ProductSchemaModel.findByIdAndDelete(productId);
});
const searchProductsInDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(searchTerm, "i"); // 'i' makes it case-insensitive
    return yield ecommerce_model_1.ProductSchemaModel.find({
        $or: [
            { name: regex },
            { description: regex },
            { category: regex },
            { tags: regex },
        ],
    });
});
exports.productServices = {
    createProductIntoDB,
    getAllProductFromDB,
    getProductByIdFromDB,
    updateProductInDB,
    deleteProductFromDB,
    searchProductsInDB,
};
