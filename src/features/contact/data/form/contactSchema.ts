import * as Yup from "yup";

const contactSchema = Yup.object({
  firstName: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  title: Yup.string()
    .max(500, "must be 500 characters or less")
    .required("Required"),
  department: Yup.string()
    .max(200, "must be 200 characters or less")
    .required("Required"),
  site: Yup.string().max(100, "must be 100 characters or less"),
  photoUrl: Yup.string().url("Must be a valid url"),
  linkedInUrl: Yup.string().url("Must be a valid url"),
  bio: Yup.string().max(1000, "must be 1000 characters or less"),
});

export default contactSchema;
