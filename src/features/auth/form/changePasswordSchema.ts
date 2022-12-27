import * as Yup from "yup";

const changePasswordSchema = Yup.object({
  oldPassword: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  password1: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  password2: Yup.string()
    .oneOf([Yup.ref("password1"), null], "Passwords must match")
    .required("Required"),
});

export default changePasswordSchema;
