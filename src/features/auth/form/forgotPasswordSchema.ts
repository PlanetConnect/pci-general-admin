import * as Yup from "yup";

const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  password1: Yup.string().max(100, "Must be 100 characters or less"),
  password2: Yup.string().oneOf(
    [Yup.ref("password1"), null],
    "Passwords must match"
  ),
  //   password1: Yup.string()
  //     .max(100, "Must be 100 characters or less")
  //     .required("Required"),
  //   password2: Yup.string()
  //     .max(100, "Must be 100 characters or less")
  //     .required("Required"),
});

export default forgotPasswordSchema;
