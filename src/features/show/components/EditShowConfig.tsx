import {
  AddFieldForm,
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

interface EditShowConfigProps {
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

const EditShowConfig = (props: EditShowConfigProps) => {
  const handleSubmit = (values: Value) => {
    console.log(values);
  };

  return (
    <Form
      size="md"
      initialValues={show}
      onSubmit={handleSubmit}
      validationSchema={showSchema}
    >
      <FormHeader>Edit Show Config Properties</FormHeader>
      <FormBody>
        <TextField type="text" label="Name" name="name" variant="filled" />
        <TextField type="number" label="Year" name="year" variant="filled" />
      </FormBody>
      <FormActions>
        <AddFieldForm />
      </FormActions>
    </Form>
  );
};

export default EditShowConfig;
