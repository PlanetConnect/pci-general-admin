import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress, Typography } from "@mui/material";
import { Show, ShowSchema } from "@pci/pci-services.types.show";
import { useNavigate, useParams } from "react-router-dom";

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
import {
  useGetShowByIdQuery,
  useUpdateShowMutation,
} from "~/services/queryApi";

import showSchema from "./data/form/showSchema";
import showSetups from "./data/form/showSetups";
import showStatuses from "./data/form/showStatuses";

const EditShowInfo = () => {
  const { openSnackBar } = useSnackBar();
  const { showId } = useParams();

  const navigate = useNavigate();

  const [updateShow, results] = useUpdateShowMutation();
  const { data: show, isLoading, isError } = useGetShowByIdQuery(showId || "");
  console.log("🚀 ~ file: EditShowInfo.tsx:35 ~ EditShowInfo ~ show", show);
  if (isError) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <ErrorIcon color="error" />
        <Typography>Error Fetching Information</Typography>
      </div>
    );
  }
  if (isLoading || show === undefined) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <CircularProgress />
        <Typography>Loading...</Typography>
      </div>
    );
  }
  console.log("🚀 ~ file: EditShowInfo.tsx:68 ~ EditShowInfo ~ show", show);
  const defaultValues = new Show({ ...show.data });

  if (!defaultValues.start_date) {
    defaultValues.start_date = new Date();
  }
  if (!defaultValues.end_date) {
    defaultValues.end_date = new Date();
  }

  if (!defaultValues.venue) {
    defaultValues.venue = {
      city: "",
      country: "",
      facility: "test",
      state: "",
      street: "",
      zip: "",
    };
  }

  const handleSubmit = async (values: Show) => {
    try {
      await updateShow({ show: values, id: showId || "" });

      openSnackBar({
        message: "Show successfully updated.",
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "success",
      });

      navigate(`/shows`);
    } catch (e: any) {
      openSnackBar({
        message: `Show cannot be updated. ${e.data.error}`,
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "error",
      });
    }
  };

  return (
    <Form
      size="lg"
      defaultValues={defaultValues}
      validationSchema={ShowSchema}
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
            facility: "venue.facility",
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
