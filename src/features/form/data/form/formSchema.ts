import * as Yup from "yup";

const formSchema = Yup.object({
  name: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  type: Yup.string().required("Required"),
  isActive: Yup.boolean().required("Required"),
});

export default formSchema;
