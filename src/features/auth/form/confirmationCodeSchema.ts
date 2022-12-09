import * as Yup from "yup";

const confirmationCodeSchema = Yup.object({
  code: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
});

export default confirmationCodeSchema;
