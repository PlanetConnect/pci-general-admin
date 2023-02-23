import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress, Typography } from "@mui/material";
import {
  Attendee,
  AttendeeProps,
  AttendeeSchema,
} from "@pci/pci-services.types.attendee";
import { ContactProps } from "@pci/pci-services.types.contact";
import { Show } from "@pci/pci-services.types.show";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SaveButton } from "~/app/templates/button";
import { PaperContent } from "~/app/templates/content/";
import {
  Actions,
  Form,
  Header,
  MultiSelect,
  Section,
  TextField,
} from "~/app/templates/formbuilder";
import AutoComplete from "~/app/templates/formbuilder/components/AutoComplete";
import { useSnackBar } from "~/app/templates/snackbar";
import { getUser } from "~/features/auth/userSlice";
import { getCurrentShow } from "~/features/persist/persistSlice";
import {
  useCreateAttendeeMutation,
  useGetContactsQuery,
} from "~/services/queryApi";

import days from "./data/form/days";
import roles from "./data/form/roles";

const CreateAttendee = () => {
  const { openSnackBar } = useSnackBar();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  if (!user) {
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
      <Typography>Please log in again</Typography>
    </div>;
  }
  const currentShow = useSelector(getCurrentShow) as Show;
  if (!currentShow) {
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
        <Typography>Please select a show first</Typography>
      </div>
    );
  }
  const { data: contacts, isLoading, isError } = useGetContactsQuery();

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
  if (isLoading || contacts === undefined) {
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

  const [createAttendee, results] = useCreateAttendeeMutation();

  const defaultValues = new Attendee({
    attendance_days: [],
    contact: { email: "" },
    email: "",
    roles: [],
    show_id: currentShow?.show_id as string,
    account_id: "",
  });

  const handleSubmit = async (values: AttendeeProps) => {
    try {
      values.email = values.contact.email;
      values.account_id = values.contact.account_id as string;
      values.contact = values.contact as ContactProps;

      await createAttendee({
        attendee: new Attendee(values),
        showId: currentShow?.show_id as string,
      }).unwrap();
      navigate(`/attendees`);
      openSnackBar({
        message: "Attendee successfully created.",
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "success",
      });
    } catch (e: any) {
      console.log("🚀 ~ file: CreateAttendee.tsx:115 ~ handleSubmit ~ e", e);
      openSnackBar({
        message: `Attendee cannot be created. ${e.error}`,
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "error",
      });
    }
  };

  return (
    <PaperContent>
      <Form
        size="md"
        defaultValues={defaultValues}
        validationSchema={AttendeeSchema}
        onSubmit={handleSubmit}
      >
        <Header>Create Attendee Information</Header>

        <Section name="Show information">
          <TextField type="text" label="Badge Key" name="badgeKey" isDisabled />
          <TextField
            type="text"
            label="Show"
            name="showName"
            value={currentShow?.name}
            isDisabled
          />
          <TextField
            type="text"
            label="Company"
            name="attendeeAccountName"
            value={" "}
            isDisabled
          />
        </Section>

        <Section name="Roles">
          <MultiSelect
            label="Roles"
            name="roles"
            options={roles}
            selected={undefined}
          />
        </Section>
        <Section name="Attendance">
          <MultiSelect
            label="Days"
            name="attendance_days"
            options={days}
            selected={undefined}
          />
        </Section>

        <Section name="Attendee information">
          <AutoComplete
            label="Attendee"
            name="contact"
            options={contacts?.data as any[]}
            selected={undefined}
          />
        </Section>

        <Actions>
          <SaveButton />
        </Actions>
      </Form>
    </PaperContent>
  );
};

export default CreateAttendee;
