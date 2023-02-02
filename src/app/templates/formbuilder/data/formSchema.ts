import * as Joi from "joi";

import fieldSchema from "./fieldSchema";

const formSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    "any.required": "Required",
    "string.max": "Must be 100 characters or less",
  }),
  type: Joi.string().required().messages({ "any.required": "Required" }),
  isActive: Joi.boolean().required().messages({ "any.required": "Required" }),
  description: Joi.string().max(200).messages({
    "string.max": "Must be 200 characters or less",
  }),
  fields: Joi.array().items(fieldSchema),
});

export default formSchema;
