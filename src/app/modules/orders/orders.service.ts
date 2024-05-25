import { IOrder } from "./orders.interface";
import { OrderSchemaModel } from "./orders.model";

const createOrderInDB = async (orderData: IOrder) => {
  return await OrderSchemaModel.create(orderData);
};

const getAllOrdersFromDB = async () => {
  return await OrderSchemaModel.find({});
};

const getOrdersByEmailFromDB = async (email: string) => {
  return await OrderSchemaModel.find({ email });
};

export const orderServices = {
  createOrderInDB,
  getAllOrdersFromDB,
  getOrdersByEmailFromDB,
};
