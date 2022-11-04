import * as Yup from "yup";

const showSchema = Yup.object({
  name: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  status: Yup.string().required("Required"),
  setup: Yup.string().required("Required"),
  start_date: Yup.date().typeError("Must be a valid Date").required("Required"),
  end_date: Yup.date().typeError("Must be a valid Date").required("Required"),
  year: Yup.number()
    .min(2010, "Must be between 2010 and 2050")
    .max(2050, "Must be between 2010 and 2050")
    .required("Required"),
  links: Yup.array().of(
    Yup.object({
      virtualEnvironment: Yup.string()
        .url("Link must be a valid URL")
        .nullable(),
      internal: Yup.string().url("Link must be a valid URL").nullable(),
      external: Yup.string().url("Link must be a valid URL").nullable(),
    })
  ),
});

export default showSchema;
