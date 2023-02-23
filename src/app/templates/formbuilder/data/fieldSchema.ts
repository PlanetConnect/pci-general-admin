import * as Joi from "joi";

const field = {
  type: Joi.string().required().messages({ "any.required": "Required" }),
  name: Joi.string().max(100).required().messages({
    "any.required": "Required",
    "string.max": "Must be 100 characters or less",
  }),
  label: Joi.string().max(100).required().messages({
    "any.required": "Required",
    "string.max": "Must be 100 characters or less",
  }),
  isActive: Joi.boolean().required().messages({ "any.required": "Required" }),
  options: [
    Joi.object({
      label: Joi.string().required().messages({ "any.required": "Required" }),
      value: Joi.string().required().messages({ "any.required": "Required" }),
    }),
  ],

  validations: Joi.object({
    isRequired: Joi.boolean()
      .required()
      .messages({ "any.required": "Required" }),
    max: Joi.number(),
    min: Joi.number(),
  })
    .required()
    .messages({ "any.required": "Required" }),
};

const fieldSchema = Joi.object({
  ...field,
  fields: Joi.array().items(Joi.object({ ...field })),
});

export default fieldSchema;
