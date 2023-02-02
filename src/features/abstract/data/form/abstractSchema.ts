import * as Joi from "joi";

const abstractSchema = Joi.object({
  status: Joi.string().required().messages({
    "any.required": "Required",
  }),
  show_id: Joi.string().allow(null),
  account_id: Joi.string().allow(null),
  abstract_id: Joi.string().allow(null),
  schedule: Joi.date().allow(null),
  accepted_type: Joi.string().max(200).messages({
    "string.max": "Must be 200 characters or less",
  }),
  submission_types: Joi.array().allow(null),
  topic: Joi.string().max(200).messages({
    "string.max": "Must be 200 characters or less",
  }),
  area_of_science: Joi.string().allow(null),
  phase: Joi.string().allow(null),
  track: Joi.string().allow(null),
  note: Joi.string().allow(null),
  seq_no: Joi.string().allow(null),
  source: Joi.string().allow(null),
  trackNumber: Joi.number().allow(null),
  is_live: Joi.boolean().allow(null),
  is_public: Joi.boolean().allow(null),
  keywords: Joi.string().allow(null),
  attendeeAccountName: Joi.string().allow(null),
  title: Joi.string().max(500).required().messages({
    "any.required": "Required",
    "string.max": "Must be 500 characters or less",
  }),
  // schedule
  content: Joi.string().max(2000).required().messages({
    "any.required": "Required",
    "string.max": "Must be 2000 characters or less",
  }),
  links: Joi.object({
    presentation: Joi.string().uri().message("Must be a valid url"),
    archive: Joi.string().uri().message("Must be a valid url"),
    video: Joi.string().uri().message("Must be a valid url"),
    pdf: Joi.string().uri().message("Must be a valid url"),
    host: Joi.string().uri().message("Must be a valid url"),
  }).allow(null),
  contacts: Joi.array()
    .min(1)
    .items(
      Joi.object({
        order: Joi.number().allow(null),
        roles: Joi.array().allow(null),
        contact: Joi.object().required().messages({
          "any.required": "Required",
          "object.base": "Contact is Required",
        }),
      })
    )
    .messages({
      "any.required": "Required",
      "array.base": "Contact is Required",
      "array.min": "Must select at least one Attendance Day",
    }),
  // contacts: Joi.array()
  //   .min(1)
  //   .items(
  //     Joi.object({
  //       order: Joi.number().allow(null),
  //       roles: Joi.array().allow(null),
  //       contact: Joi.object({
  //         email: Joi.string()
  //           .required()
  //           .messages({ "any.required": "Contact is Required" }),
  //       })
  //         .required()
  //         .messages({
  //           "any.required": "Required",
  //           "object.base": "Contact is Required",
  //         }),
  //     })
  //   )
  //   .messages({
  //     "any.required": "Required",
  //     "array.base": "Contact is Required",
  //     "array.min": "Must select at least one Attendance Day",
  //   }),
});

export default abstractSchema;
