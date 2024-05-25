import { Request, Response } from "express";
import orderValidationSchema from "./orders.validation";
import { orderServices } from "./orders.service";

export const createOrder = async (req: Request, res: Response) => {
  const { error, value } = orderValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Validation error",
      error: error.details,
    });
  }

  try {
    const order = await orderServices.createOrderInDB(value);
    return res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: order,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the order",
      error: err.message,
    });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const { email } = req.query;

  try {
    let orders;
    if (email && typeof email === "string") {
      orders = await orderServices.getOrdersByEmailFromDB(email);
      return res.status(200).json({
        success: true,
        message: `Orders fetched successfully for user email ${email}!`,
        data: orders,
      });
    } else {
      orders = await orderServices.getAllOrdersFromDB();
      return res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: orders,
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the orders",
      error: err.message,
    });
  }
};

export const orderControllers = {
  createOrder,
  getOrders,
};
