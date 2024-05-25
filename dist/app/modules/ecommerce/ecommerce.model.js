"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchemaModel = void 0;
const mongoose_1 = require("mongoose");
const variantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, "type is required"],
    },
    value: {
        type: String,
        required: [true, "value is required"],
    },
});
const inventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: [true, "type is required"],
    },
    inStock: {
        type: Boolean,
        default: false,
    },
});
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Product Name is Required"],
        trim: true,
        maxlength: [30, "Product can not be more than 30 characters"],
    },
    description: {
        type: String,
        required: [true, "Product Description is Required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Product is Required"],
    },
    category: {
        type: String,
        required: [true, "category information is required"],
    },
    tags: {
        type: [String],
        required: true,
    },
    variants: {
        type: [variantSchema],
        required: [true, "variants information is required"],
    },
    inventory: {
        type: inventorySchema,
        required: [true, "inventory information is required"],
    },
});
exports.ProductSchemaModel = (0, mongoose_1.model)("Product", productSchema);
