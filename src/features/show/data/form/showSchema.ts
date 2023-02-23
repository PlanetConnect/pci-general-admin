import * as Joi from "joi";

const showSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    "any.required": "Required",
    "string.max": "Must be 100 characters or less",
  }),
  description: Joi.string().max(500).messages({
    "string.max": "Must be 500 characters or less",
  }),
  status: Joi.string().required().messages({ "any.required": "Required" }),
  show_id: Joi.string().allow(null),
  setup: Joi.string().required().messages({ "any.required": "Required" }),
  start_date: Joi.date().required().messages({
    "date.base": "Must be a valid Date",
    "any.required": "Required",
  }),
  end_date: Joi.date().required().messages({
    "date.base": "Must be a valid Date",
    "any.required": "Required",
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
  year: Joi.number().min(2010).max(2050).required().messages({
    "number.min": "Must be between 2010 and 2050",
    "number.max": "Must be between 2010 and 2050",
    "any.required": "Required",
  }),
  links: Joi.array()
    .items(
      Joi.object({
        virtual_environment: Joi.string()
          .uri()
          .messages({ "string.uri": "Link must be a valid URL" })
          .allow(null),
        internal: Joi.string()
          .uri()
          .messages({ "string.uri": "Link must be a valid URL" })
          .allow(null),
        external: Joi.string()
          .uri()
          .messages({ "string.uri": "Link must be a valid URL" })
          .allow(null),
      }).allow(null)
    )
    .allow(null),
  venue: Joi.object({
    facility: Joi.string().allow(null, ""),
    street: Joi.string().allow(null, ""),
    city: Joi.string().allow(null, ""),
    state: Joi.string().allow(null, ""),
    zip: Joi.string().allow(null, ""),
    country: Joi.string().allow(null, ""),
  }),
  twilio: Joi.object({
    conversation_sid: Joi.string().allow(null),
    sync_sid: Joi.string().allow(null),
  }),
});

export default showSchema;
