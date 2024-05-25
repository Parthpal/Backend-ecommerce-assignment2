import Joi from "joi";

const orderValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .error(new Error("A valid email address is required")),
  productId: Joi.string().required().error(new Error("Product ID is required")),
  price: Joi.number()
    .required()
    .error(new Error("Price is required and must be a number")),
  quantity: Joi.number()
    .integer()
    .min(1)
    .required()
    .error(
      new Error(
        "Quantity is required, must be an integer, and cannot be less than 1"
      )
    ),
});
export default orderValidationSchema;
