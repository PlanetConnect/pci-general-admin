import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  password: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
});

export default loginSchema;
