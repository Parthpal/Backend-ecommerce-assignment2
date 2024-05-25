import { Request, Response } from "express";
import { productServices } from "./ecommerce.service";
import productValidationSchema from "./ecommere.validation";
import productsArrayValidationSchema from "./ecommere.validation";
import { any } from "joi";

const createProduct = async (req: Request, res: Response) => {
  //  console.log(req.body);
  const products = req.body;
  console.log(products);
  const { error, value } = productValidationSchema.validate(products);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Validation error",
      error: error.details, // Provide more detailed error information
    });
  }

  try {
    const result = await productServices.createProductIntoDB(value);
    return res.status(200).json({
      success: true,
      message: "Product is created successfully",
      data: result,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the product",
      error: err.message,
    });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;

  try {
    if (searchTerm) {
      // Perform search based on searchTerm
      const products = await productServices.searchProductsInDB(
        searchTerm.toString()
      );
      res.json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: products,
      });
    } else {
      // Retrieve all products
      const products1 = await productServices.getAllProductFromDB();
      res.json({
        success: true,
        message: "Products fetched successfully!",
        data: products1,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const getProductById = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const product = await productServices.getProductByIdFromDB(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: product,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the product",
      error: err.message,
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { error, value } = productValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Validation error",
      error: error.details,
    });
  }

  try {
    const updatedProduct = await productServices.updateProductInDB(
      productId,
      value
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
      error: err.message,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await productServices.deleteProductFromDB(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product",
      error: err.message,
    });
  }
};
const searchProducts = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;

  if (typeof searchTerm !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid search term provided",
    });
  }

  try {
    const products = await productServices.searchProductsInDB(searchTerm);

    return res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: products,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while searching for products",
      error: err.message,
    });
  }
};

export const productControllers = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
};
