import * as Joi from "joi";

const exhibitionSchema = Joi.object({
  show_id: Joi.string()
    .required()
    .messages({ "any.required": "Show is Required" }),
  type: Joi.string().required().messages({ "any.required": "Required" }),
  is_public: Joi.boolean().required().messages({ "any.required": "Required" }),
  is_active: Joi.boolean().required().messages({ "any.required": "Required" }),
  // account_id: Joi.string(),

  design_number: Joi.number().allow(null),
  display_name: Joi.string()
    .max(200)
    .messages({
      "string.max": "Must be 200 characters or less",
    })
    .allow(null),
  number: Joi.number().allow(null),
  website: Joi.string().uri().message("Must be a valid url").allow(null),
  logo_url: Joi.string().uri().message("Must be a valid url").allow(null),
  color: Joi.object({
    primary: Joi.string().allow(null),
    secondary: Joi.string().allow(null),
  }).allow(null),
  description: Joi.string()
    .max(1000)
    .messages({
      "string.max": "Must be 1000 characters or less",
    })
    .allow(null),
  tags: Joi.array().items(Joi.string()).allow(null),
  sponsorship: Joi.string().allow(null),
  virtual_staff_limit: Joi.number().allow(null),
  onsite_staff_limit: Joi.number().allow(null),
  product_showcase_limit: Joi.number().allow(null),
  meetingRoom_client_link: Joi.string()
    .uri()
    .message("Must be a valid url")
    .allow(null),
  meetingRoomHost_link: Joi.string()
    .uri()
    .message("Must be a valid url")
    .allow(null),
  meetingRoom_number: Joi.number().allow(null),
});

export default exhibitionSchema;
