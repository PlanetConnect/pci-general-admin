import * as Yup from "yup";

const fieldSchema = Yup.object().shape({
  type: Yup.string().required("Required"),
  name: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  label: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  isActive: Yup.boolean().required("Required"),
  options: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required("Required"),
      value: Yup.string().required("Required"),
    })
  ),
  validations: Yup.object()
    .shape({
      isRequired: Yup.boolean().required("Required"),
      max: Yup.number(),
      min: Yup.number(),
    })
    .required("Required"),
});

export default fieldSchema;
