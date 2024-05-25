import { Tproduct } from "./ecommerce.interface";
import { ProductSchemaModel } from "./ecommerce.model";

const createProductIntoDB = async (productData: Tproduct) => {
  const result = await ProductSchemaModel.create(productData);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await ProductSchemaModel.find({});
  return result;
};

const getProductByIdFromDB = async (productId: string) => {
  return await ProductSchemaModel.findById(productId);
};

const updateProductInDB = async (productId: string, productData: any) => {
  return await ProductSchemaModel.findByIdAndUpdate(productId, productData, {
    new: true,
  });
};

const deleteProductFromDB = async (productId: string) => {
  return await ProductSchemaModel.findByIdAndDelete(productId);
};

const searchProductsInDB = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, "i"); // 'i' makes it case-insensitive
  return await ProductSchemaModel.find({
    $or: [
      { name: regex },
      { description: regex },
      { category: regex },
      { tags: regex },
    ],
  });
};

export const productServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getProductByIdFromDB,
  updateProductInDB,
  deleteProductFromDB,
  searchProductsInDB,
};
