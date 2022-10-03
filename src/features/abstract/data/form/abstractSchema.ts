import * as Yup from "yup";

const abstractSchema = Yup.object({
  status: Yup.string().required(),
  showId: Yup.string().required("Show is Required"),
  accountId: Yup.string().required("Account is Required"),
  isPublic: Yup.boolean().required(),
  acceptedType: Yup.string().max(200, "Must be 200 characters or less"),
  submissionTypes: Yup.array().min(1, "Required"),
  topic: Yup.string().max(200, "Must be 500 characters or less"),
  areaOfScience: Yup.string(),
  phase: Yup.string(),
  track: Yup.string(),
  trackNumber: Yup.number(),
  isLive: Yup.boolean(),
  keywords: Yup.string(),
  title: Yup.string().max(500, "Must be 500 characters or less"),
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
      contactId: Yup.string().required(),
      roles: Yup.array().min(1, "Required"),
      order: Yup.number(),
    })
  ),
});

export default abstractSchema;
