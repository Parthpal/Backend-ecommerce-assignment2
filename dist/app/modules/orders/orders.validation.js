"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const orderValidationSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .required()
        .error(new Error("A valid email address is required")),
    productId: joi_1.default.string().required().error(new Error("Product ID is required")),
    price: joi_1.default.number()
        .required()
        .error(new Error("Price is required and must be a number")),
    quantity: joi_1.default.number()
        .integer()
        .min(1)
        .required()
        .error(new Error("Quantity is required, must be an integer, and cannot be less than 1")),
});
exports.default = orderValidationSchema;
