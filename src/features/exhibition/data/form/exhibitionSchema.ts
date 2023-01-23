import * as Yup from "yup";

const exhibitionSchema = Yup.object({
  show_id: Yup.string().required("Show is Required"),
  type: Yup.string().required(),
  is_public: Yup.boolean().required(),
  is_active: Yup.boolean().required(),
  // account_id: Yup.string(),

  design_number: Yup.number(),
  display_name: Yup.string().max(200, "Must be 200 characters or less"),
  number: Yup.number(),
  website: Yup.string().url("Must be a valid url"),
  logo_url: Yup.string().url("Must be a valid url"),
  color: Yup.object({
    primary: Yup.string(),
    secondary: Yup.string(),
  }),
  description: Yup.string().max(1000, "Must be 1000 characters or less"),
  tags: Yup.array().of(Yup.string()),
  sponsorship: Yup.string(),
  virtual_staff_limit: Yup.number(),
  onsite_staff_limit: Yup.number(),
  product_showcase_limit: Yup.number(),
  meetingRoom_client_link: Yup.string().url("Must be a valid url"),
  meetingRoomHost_link: Yup.string().url("Must be a valid url"),
  meetingRoom_number: Yup.number(),
});

export default exhibitionSchema;
