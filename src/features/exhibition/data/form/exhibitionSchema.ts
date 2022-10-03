import * as Yup from "yup";

const exhibitionSchema = Yup.object({
  showId: Yup.string().required("Show is Required"),
  accountId: Yup.string().required("Account is Required"),
  type: Yup.string().required(),
  designNumber: Yup.number().required(),
  displayName: Yup.string()
    .max(200, "Must be 200 characters or less")
    .required(),
  isPublic: Yup.boolean().required(),
  isActive: Yup.boolean().required(),
  number: Yup.number().required(),
  websiteUrl: Yup.string().url("Must be a valid url").required(),
  logoUrl: Yup.string().url("Must be a valid url"),
  primaryColor: Yup.string().required(),
  secondaryColor: Yup.string().required(),
  description: Yup.string()
    .max(1000, "Must be 1000 characters or less")
    .required(),
  tags: Yup.string().required(),
  sponsorship: Yup.string().required(),
  virtualStaffLimit: Yup.number(),
  onsiteStaffLimit: Yup.number(),
  productShowcaseLimit: Yup.number(),
  meetingRoomCLientLink: Yup.string().url("Must be a valid url"),
  meetingRoomHostLink: Yup.string().url("Must be a valid url"),
  meetingRoomNumber: Yup.number(),
});

export default exhibitionSchema;
