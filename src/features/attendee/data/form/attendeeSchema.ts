import * as Joi from "joi";

const attendeeSchema = Joi.object({
  // showId: Joi.string().required("Show is Required"),
  // attendeeAccountId: Joi.string().required("Account is Required"),
  // email: Joi.string().required("Contact is Required"),
  badgeKey: Joi.string().allow(null, ""),
  showName: Joi.string().allow(null, ""),

  attendeeAccountName: Joi.string().allow(null, ""),

  roles: Joi.array().min(1).required().messages({
    "any.required": "Required",
    "array.min": "Must select at least one role",
  }),
  attendance_days: Joi.array().min(1).required().messages({
    "any.required": "Required",
    "array.min": "Must select at least one Attendance Day",
  }),
  contact: Joi.object().required().messages({
    "any.required": "Required",
    "object.base": "Contact is Required",
  }),
});

export default attendeeSchema;
