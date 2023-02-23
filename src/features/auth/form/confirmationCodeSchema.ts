import * as Joi from "joi";

const confirmationCodeSchema = Joi.object({
  code: Joi.string().max(100).required().messages({
    "any.required": "Required",
    "string.max": "Must be 100 characters or less",
  }),
});

export default confirmationCodeSchema;
