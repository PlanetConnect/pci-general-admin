import * as Joi from "joi";

const roleSchema = Joi.object({
  name: Joi.string().max(200).required().messages({
    "any.required": "Required",
    "string.max": "Must be 200 characters or less",
  }),
  isActive: Joi.boolean().required().messages({ "any.required": "Required" }),

  description: Joi.string().max(1000).required().messages({
    "any.required": "Required",
    "string.max": "Must be 1000 characters or less",
  }),
});

export default roleSchema;
