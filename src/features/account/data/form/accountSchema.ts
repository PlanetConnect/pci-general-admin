import * as Joi from "joi";

const accountSchema = Joi.object({
  name: Joi.string().max(200).required().messages({
    "any.required": "Required",
    "string.max": "Must be 200 characters or less",
  }),
  show_id: Joi.string().allow(null, ""),
  account_id: Joi.string().allow(null, ""),
  phone: Joi.string().allow(null, ""),
  tags: Joi.string().allow(null, ""),
  type: Joi.string().allow(null, ""),

  website: Joi.string().uri().required().messages({
    "any.required": "Required",
    "string.uri": "Must be a valid url",
  }),
  logo_url: Joi.string()
    .uri()
    .messages({
      "string.uri": "Must be a valid url",
    })
    .allow(null, ""),
  description: Joi.string()
    .max(1000)
    .messages({
      "any.required": "Required",
      "string.max": "Must be 1000 characters or less",
    })
    .allow(null, ""),
  address: Joi.object({
    street: Joi.string().allow(null, ""),
    city: Joi.string().allow(null, ""),
    state: Joi.string().allow(null, ""),
    zip: Joi.string().allow(null, ""),
    country: Joi.string().required().messages({ "any.required": "Required" }),
  }),

  created_time: Joi.date()
    .messages({
      "date.base": "Must be a valid Date",
    })
    .allow(null),
  modified_time: Joi.date()
    .messages({
      "date.base": "Must be a valid Date",
    })
    .allow(null),
});

export default accountSchema;
