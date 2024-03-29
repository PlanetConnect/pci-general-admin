import * as Yup from "yup";

const attendeeSchema = Yup.object({
  showId: Yup.string().required("Show is Required"),
  attendeeAccountId: Yup.string().required("Account is Required"),
  contactId: Yup.string().required("Contact is Required"),
  roles: Yup.array().min(1, "Required").required(),
  days: Yup.array().min(1, "Required").required(),
});

export default attendeeSchema;
