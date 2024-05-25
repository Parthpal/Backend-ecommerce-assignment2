import Joi from "joi";

const variantSchema = Joi.object({
  type: Joi.string()
    .trim()
    .required()
    .error(new Error("Variant type is required")),
  value: Joi.string()
    .trim()
    .required()
    .error(new Error("Variant value is required")),
});

const inventorySchema = Joi.object({
  quantity: Joi.number()
    .integer()
    .min(0)
    .required()
    .error(
      new Error("Inventory quantity is required and must be a positive integer")
    ),
  inStock: Joi.boolean().default(false),
});

const productValidationSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .max(30)
    .error(new Error("Product Name is required and must be trimmed")),
  description: Joi.string()
    .trim()
    .required()
    .error(new Error("Product description is required and must be trimmed")),
  price: Joi.number().required().error(new Error("Product price is required")),
  category: Joi.string()
    .trim()
    .required()
    .error(new Error("Product category is required and must be trimmed")),
  tags: Joi.array()
    .items(Joi.string().trim().required())
    .min(1)
    .required()
    .error(
      new Error(
        "Product tags are required and must be an array of non-empty strings"
      )
    ),
  variants: Joi.array()
    .items(variantSchema)
    .required()
    .error(
      new Error(
        "Product variants are required and must be an array of valid variant objects"
      )
    ),
  inventory: inventorySchema
    .required()
    .error(new Error("Product inventory information is required")),
});

export default productValidationSchema;
