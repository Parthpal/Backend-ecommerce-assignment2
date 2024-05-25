import cors from "cors";
import express, { Application, Request, Response } from "express";
import { productRoutes } from "./app/modules/ecommerce/ecommerce.route";
import { orderRoutes } from "./app/modules/orders/orders.route";
//import { StudentRoutes } from "./app/modules/student/student.route";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

export default app;
