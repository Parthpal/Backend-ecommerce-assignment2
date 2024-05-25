"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const variantSchema = joi_1.default.object({
    type: joi_1.default.string()
        .trim()
        .required()
        .error(new Error("Variant type is required")),
    value: joi_1.default.string()
        .trim()
        .required()
        .error(new Error("Variant value is required")),
});
const inventorySchema = joi_1.default.object({
    quantity: joi_1.default.number()
        .integer()
        .min(0)
        .required()
        .error(new Error("Inventory quantity is required and must be a positive integer")),
    inStock: joi_1.default.boolean().default(false),
});
const productValidationSchema = joi_1.default.object({
    name: joi_1.default.string()
        .trim()
        .required()
        .max(30)
        .error(new Error("Product Name is required and must be trimmed")),
    description: joi_1.default.string()
        .trim()
        .required()
        .error(new Error("Product description is required and must be trimmed")),
    price: joi_1.default.number().required().error(new Error("Product price is required")),
    category: joi_1.default.string()
        .trim()
        .required()
        .error(new Error("Product category is required and must be trimmed")),
    tags: joi_1.default.array()
        .items(joi_1.default.string().trim().required())
        .min(1)
        .required()
        .error(new Error("Product tags are required and must be an array of non-empty strings")),
    variants: joi_1.default.array()
        .items(variantSchema)
        .required()
        .error(new Error("Product variants are required and must be an array of valid variant objects")),
    inventory: inventorySchema
        .required()
        .error(new Error("Product inventory information is required")),
});
exports.default = productValidationSchema;
