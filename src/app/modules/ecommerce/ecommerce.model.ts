import { Schema, model } from "mongoose";
import { Tinventory, Tproduct, Tvariants } from "./ecommerce.interface";
import { boolean } from "joi";

const variantSchema = new Schema<Tvariants>({
  type: {
    type: String,
    required: [true, "type is required"],
  },
  value: {
    type: String,
    required: [true, "value is required"],
  },
});
const inventorySchema = new Schema<Tinventory>({
  quantity: {
    type: Number,
    required: [true, "type is required"],
  },
  inStock: {
    type: Boolean,
    default: false,
  },
});
const productSchema = new Schema<Tproduct>({
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

export const ProductSchemaModel = model("Product", productSchema);
