import {
  AddressField,
  Form,
  FormActions,
  FormBody,
  FormHeader,
  FormSection,
  DateField,
  SaveButton,
  Select,
  TextField,
  Value,
} from "../../../app/templates/form";

import Show from "../data/types/Show";
import showSchema from "../data/form/showSchema";
import showSetups from "../data/form/showSetups";
import showStatuses from "../data/form/showStatuses";

import { useSnackBar } from "../../../app/templates/snackbar";

import Stack from "@mui/material/Stack";

interface EditShowInfoProps {
  show: Show;
}

const show = {
  showId: "06a5ba5a-4f15-4147-a110-ec33187c4bff",
  name: "Merck Technology Symposium 2022",
  year: 2022,
  links: [
    {
      showId: "06a5ba5a-4f15-4147-a110-ec33187c4bff",
      virtualEnvironment: "https://test-with-new-link.com",
      internal: "https://tests.com",
      external: "https://www.commendssss.com",
    },
  ],
  startDate: "2022-03-06",
  endDate: "2022-03-11",
  setup: "hybrid",
  isActive: true,
  facility: "Nuclear Silo",
  street: "test",
  city: "Longhorn",
  state: "NJ",
  zip: "08722",
  country: "US",
  description: "The Description of my Show!",
  createdTime: "2022-04-15 09:39:34.120772",
  modifiedTime: "2022-04-15 09:39:34.120772",
  status: "under_construction",
};

const EditShowInfo = (props: EditShowInfoProps) => {
  const { openSnackBar } = useSnackBar();
  const handleSubmit = (values: Value) => {
    console.log(values);
    openSnackBar({
      message: "Show successfully updated.",
      position: {
        vertical: "top",
        horizontal: "center",
      },
      variant: "success",
    });
  };

  return (
    <Form
      size="sm"
      initialValues={show}
      onSubmit={handleSubmit}
      validationSchema={showSchema}
    >
      <FormHeader>Edit Show Information</FormHeader>

      <FormBody>
        <FormSection name="General information">
          <Select
            label="Status"
            name="status"
            variant="filled"
            options={showStatuses}
          />
          <Select
            label="Setup"
            name="setup"
            variant="filled"
            options={showSetups}
          />
          <TextField type="text" label="Name" name="name" variant="filled" />
          <TextField type="number" label="Year" name="year" variant="filled" />

          <DateField
            label="Start Date"
            dateValue={show.startDate}
            name="startDate"
            variant="filled"
          />
          <DateField
            label="Date Date"
            dateValue={show.endDate}
            name="endDate"
            variant="filled"
          />
        </FormSection>

        <FormSection name="Links">
          <TextField
            type="text"
            label="Virtual Environment"
            name="links[0].virtualEnvironment"
            variant="filled"
          />
          <TextField
            type="text"
            label="External"
            name="links[0].external"
            variant="filled"
          />
          <TextField
            type="text"
            label="Internal"
            name="links[0].internal"
            variant="filled"
          />
        </FormSection>

        <FormSection name="Address">
          <AddressField
            address={{
              address1: "facility",
            }}
            variant="filled"
          />
        </FormSection>
      </FormBody>
      <FormActions>
        <SaveButton />
      </FormActions>
    </Form>
  );
};

export default EditShowInfo;
