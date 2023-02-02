import * as Joi from "joi";

const forgotPasswordSchema = Joi.object({
  email: Joi.string().max(100).required().messages({
    "any.required": "Required",
    "string.max": "Must be 100 characters or less",
  }),
  password1: Joi.string().max(100).required().messages({
    "any.required": "Required",
    "string.max": "Must be 100 characters or less",
  }),
  password2: Joi.string().valid(Joi.ref("password1")).required().messages({
    "any.required": "Required",
    "any.only": "Passwords must match",
  }),
});

export default forgotPasswordSchema;
