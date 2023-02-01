import * as Yup from "yup";

const abstractSchema = Yup.object({
  status: Yup.string(),
  show_id: Yup.string(),
  account_id: Yup.string(),
  accepted_type: Yup.string().max(200, "Must be 200 characters or less"),
  submission_types: Yup.array(),
  topic: Yup.string().max(200, "Must be 500 characters or less"),
  area_of_science: Yup.string(),
  phase: Yup.string(),
  track: Yup.string(),
  note: Yup.string(),
  seq_no: Yup.string(),
  source: Yup.string(),
  trackNumber: Yup.number(),
  is_live: Yup.boolean(),
  is_public: Yup.boolean(),
  keywords: Yup.string(),
  title: Yup.string().max(500, "Must be 500 characters or less"),
  // schedule
  content: Yup.string().max(2000, "Must be 2000 characters or less"),
  links: Yup.object({
    presentation: Yup.string().url("Must be a valid url"),
    archive: Yup.string().url("Must be a valid url"),
    video: Yup.string().url("Must be a valid url"),
    pdf: Yup.string().url("Must be a valid url"),
    host: Yup.string().url("Must be a valid url"),
  }),
  contacts: Yup.array().of(
    Yup.object().shape({
      contactId: Yup.string(),
      roles: Yup.array(),
      order: Yup.number(),
    })
  ),
});

export default abstractSchema;
