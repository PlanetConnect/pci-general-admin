import { useParams } from "react-router-dom";

import { SaveButton } from "~/app/templates/button";
import {
  Actions,
  AddressField,
  DateField,
  Form,
  Header,
  Section,
  Select,
  TextField,
} from "~/app/templates/formbuilder";
import { useSnackBar } from "~/app/templates/snackbar";
import Show from "~/features/show/data/types/Show";
import {
  useGetShowByIdQuery,
  useUpdateShowMutation,
} from "~/services/queryApi";

import showSchema from "./data/form/showSchema";
import showSetups from "./data/form/showSetups";
import showStatuses from "./data/form/showStatuses";

// const show: Show = {
//   showId: "06a5ba5a-4f15-4147-a110-ec33187c4bff",
//   name: "Merck Technology Symposium 2022",
//   year: 2022,
//   links: [
//     {
//       showId: "06a5ba5a-4f15-4147-a110-ec33187c4bff",
//       virtualEnvironment: "https://test-with-new-link.com",
//       internal: "https://tests.com",
//       external: "https://www.commendssss.com",
//     },
//   ],
//   startDate: "2022-03-06",
//   endDate: "2022-03-11",
//   setup: "hybrid",
//   isActive: true,
//   facility: "Nuclear Silo",
//   street: "test",
//   city: "Longhorn",
//   state: "NJ",
//   zip: "08722",
//   country: "US",
//   description: "The Description of my Show!",
//   createdTime: "2022-04-15 09:39:34.120772",
//   modifiedTime: "2022-04-15 09:39:34.120772",
//   status: "under_construction",
// };

// const ShowForm = Form<Show>;

const EditShowInfo = () => {
  const { openSnackBar } = useSnackBar();
  const { showId } = useParams();
  console.log(
    "🚀 ~ file: EditShowInfo.tsx ~ line 56 ~ EditShowInfo ~ showId",
    showId
  );

  const [updateShow, results] = useUpdateShowMutation();
  const { data: show, isLoading, isError } = useGetShowByIdQuery(showId || "");
  if (isLoading || !show) {
    return <div>loading</div>;
  }
  const defaultValues: Show = { ...show.data };
  console.log(
    "🚀 ~ file: EditShowInfo.tsx ~ line 69 ~ EditShowInfo ~ defaultValues",
    defaultValues
  );
  if (!defaultValues.start_date) {
    defaultValues.start_date = new Date();
  }
  if (!defaultValues.end_date) {
    defaultValues.end_date = new Date();
  }

  const handleSubmit = async (values: Show) => {
    console.log("save submit", values);
    // values.end_date = new Date(values.end_date).toISOString();
    // values.start_date = new Date(values.start_date).toISOString();

    const updateResult = await updateShow({ show: values, id: showId || "" });
    console.log(
      "🚀 ~ file: EditShowInfo.tsx ~ line 55 ~ handleSubmit ~ updateResult",
      updateResult
    );

    if (updateResult?.error) {
      openSnackBar({
        message: `Show cannot be updated. ${updateResult.error.error}`,
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "error",
      });
    } else {
      openSnackBar({
        message: "Show successfully updated.",
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "success",
      });
    }
  };

  return (
    <Form
      size="lg"
      defaultValues={defaultValues}
      validationSchema={showSchema}
      onSubmit={handleSubmit}
    >
      <Header>Edit Show Information</Header>

      <Section name="General information">
        <Select label="Status" name="status" options={showStatuses} />
        <Select label="Environment" name="setup" options={showSetups} />
        <TextField type="text" label="Name" name="name" />
        <TextField type="number" label="Year" name="year" />
        <DateField label="Start Date" name="start_date" />
        <DateField label="End Date" name="end_date" />
      </Section>

      <Section name="Links">
        <TextField
          type="text"
          label="Virtual Environment"
          name="links.0.virtual_environment"
        />
        <TextField type="text" label="External" name="links.0.external" />
        <TextField type="text" label="Internal" name="links.0.internal" />
      </Section>

      <Section name="Venue">
        <AddressField
          address={{
            address1: "venue.street",
            city: "venue.city",
            state: "venue.state",
            country: "venue.country",
            zip: "venue.zip",
          }}
        />
      </Section>
      <Actions>
        <SaveButton />
      </Actions>
    </Form>
  );
};

export default EditShowInfo;
