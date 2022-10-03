import * as Yup from "yup";

const accountSchema = Yup.object({
  name: Yup.string().max(200, "Must be 200 characters or less").required(),
  website: Yup.string().url("Must be a valid url").required(),
  logoUrl: Yup.string().url("Must be a valid url"),
  description: Yup.string().max(1000, "Must be 1000 characters or less"),
});

export default accountSchema;
