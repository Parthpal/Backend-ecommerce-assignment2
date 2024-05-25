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
exports.orderControllers = exports.getOrders = exports.createOrder = void 0;
const orders_validation_1 = __importDefault(require("./orders.validation"));
const orders_service_1 = require("./orders.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = orders_validation_1.default.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Validation error",
            error: error.details,
        });
    }
    try {
        const order = yield orders_service_1.orderServices.createOrderInDB(value);
        return res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: order,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the order",
            error: err.message,
        });
    }
});
exports.createOrder = createOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    try {
        let orders;
        if (email && typeof email === "string") {
            orders = yield orders_service_1.orderServices.getOrdersByEmailFromDB(email);
            return res.status(200).json({
                success: true,
                message: `Orders fetched successfully for user email ${email}!`,
                data: orders,
            });
        }
        else {
            orders = yield orders_service_1.orderServices.getAllOrdersFromDB();
            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: orders,
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the orders",
            error: err.message,
        });
    }
});
exports.getOrders = getOrders;
exports.orderControllers = {
    createOrder: exports.createOrder,
    getOrders: exports.getOrders,
};
