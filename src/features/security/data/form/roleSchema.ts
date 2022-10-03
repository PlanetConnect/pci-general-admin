import * as Yup from "yup";

const roleSchema = Yup.object({
  name: Yup.string().max(200, "Must be 200 characters or less").required(),
  isActive: Yup.boolean().required(),
  description: Yup.string()
    .max(1000, "Must be 1000 characters or less")
    .required(),
});

export default roleSchema;
