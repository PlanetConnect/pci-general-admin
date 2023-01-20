import * as Yup from "yup";

const contactSchema = Yup.object({
  first_name: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  last_name: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  email: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  department: Yup.string()
    .max(200, "must be 200 characters or less")
    .required("Required"),
  site: Yup.string().max(100, "must be 100 characters or less"),
  photo_url: Yup.string().url("Must be a valid url"),
  linked_in_url: Yup.string().url("Must be a valid url"),
  bio: Yup.string().max(1000, "must be 1000 characters or less"),
  // address: Yup.object({
  //   street: Yup.string().required("Required"),
  //   city: Yup.string().required("Required"),
  //   state: Yup.string().required("Required"),
  //   zip: Yup.string().required("Required"),
  //   country: Yup.string().required("Required"),
  // }),
});

export default contactSchema;
