import * as Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().max(100).required().messages({
    "any.required": "Required",
    "string.max": "Must be 100 characters or less",
  }),
  password: Joi.string().max(100).required().messages({
    "any.required": "Required",
    "string.max": "Must be 100 characters or less",
  }),
});

export default loginSchema;
