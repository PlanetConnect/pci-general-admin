import * as Yup from "yup";

const newPasswordSchema = Yup.object({
  password1: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  password2: Yup.string()
    .oneOf([Yup.ref("password1"), null], "Passwords must match")
    .required("Required"),
});

export default newPasswordSchema;
