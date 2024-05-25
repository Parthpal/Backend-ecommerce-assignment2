"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const ecommerce_route_1 = require("./app/modules/ecommerce/ecommerce.route");
const orders_route_1 = require("./app/modules/orders/orders.route");
//import { StudentRoutes } from "./app/modules/student/student.route";
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use("/api", ecommerce_route_1.productRoutes);
app.use("/api", orders_route_1.orderRoutes);
exports.default = app;
