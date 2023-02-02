import * as Joi from "joi";

const contactSchema = Joi.object({
  account_id: Joi.string().allow(null, ""),
  phone: Joi.string().allow(null, ""),

  first_name: Joi.string().max(100).required().messages({
    "any.required": "Required",
    "string.max": "Must be 100 characters or less",
    "string.empty": "Required",
  }),
  last_name: Joi.string().max(100).required().messages({
    "any.required": "Required",
    "string.max": "Must be 100 characters or less",
    "string.empty": "Required",
  }),
  email: Joi.string().max(100).required().messages({
    "any.required": "Required",
    "string.max": "Must be 100 characters or less",
    "string.empty": "Required",
  }),
  expertise_area: Joi.string()
    .max(100)
    .messages({
      "string.max": "Must be 100 characters or less",
    })
    .allow(null, ""),
  title: Joi.string()
    .max(100)
    .messages({
      "string.max": "Must be 100 characters or less",
    })
    .allow(null, ""),
  department: Joi.string()
    .max(200)
    .messages({
      "string.max": "Must be 200 characters or less",
    })
    .allow(null, ""),
  division: Joi.string()
    .max(200)
    .messages({
      "string.max": "Must be 200 characters or less",
    })
    .allow(null, ""),
  site: Joi.string()
    .max(100)
    .messages({
      "string.max": "Must be 100 characters or less",
    })
    .allow(null, ""),
  company: Joi.object().required().messages({
    "any.required": "Required",
    "string.empty": "Required",
  }),
  photo_url: Joi.string().uri().message("Must be a valid url").allow(null, ""),
  linked_in_url: Joi.string()
    .uri()
    .message("Must be a valid url")
    .allow(null, ""),
  bio: Joi.string().max(1000).required().messages({
    "any.required": "Required",
    "string.max": "Must be 1000 characters or less",
    "string.empty": "Required",
  }),
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

export default contactSchema;
