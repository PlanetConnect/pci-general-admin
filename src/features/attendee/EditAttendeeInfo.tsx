import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress, Typography } from "@mui/material";
import { Attendee, AttendeeSchema } from "@pci/pci-services.types.attendee";
import { ContactProps } from "@pci/pci-services.types.contact";
import { Show } from "@pci/pci-services.types.show";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

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
import { getCurrentShow } from "~/features/persist/persistSlice";
import {
  useGetAttendeeByEmailQuery,
  useGetContactsQuery,
  useUpdateAttendeeMutation,
} from "~/services/queryApi";

import attendeeSchema from "./data/form/attendeeSchema";
import days from "./data/form/days";
import roles from "./data/form/roles";

// const attendee = {
//   attendeeId: "5276827c-0d59-4416-a4ac-f1444a1f93c2",
//   showId: "5df3b780-ac2e-48b4-9d55-169ab523ac0a",
//   showName: "Test Show",
//   attendeeAccountId: "b0193ac3-f988-464d-bf2e-8accdfba945b",
//   attendeeAcountName: "PlanetConnect Inc.",
//   badgeKey: "1649871031818",
//   contactId: "c29ba4b7-0150-45dc-b0aa-d125634eb6f2",
//   roles: [
//     "43da751a-50db-43ad-b74d-818cbb77b37e",
//     "496c6b4a-bbe3-464c-8782-d9ff8f53aa1a",
//     "81107b52-e46b-4c31-8e6a-4c1e2e46f896",
//   ],
//   days: ["Physical Day 2", "Virtual Day 1"],
//   firstName: "John",
//   lastName: "Tester",
//   contactAccountId: "b0193ac3-f988-464d-bf2e-8accdfba945b",
//   contactAccountName: "PlanetConnect Inc.",
//   title: "Marketing Leader",
//   department: "Test Department",
//   site: "Testing Site",
//   linkedInUrl: "https://github.com/aws-samples/cookiecutter-aws-sam-pipeline",
//   expertiseArea: "programming,eating",
//   phone: "+17326643146",
//   bio: null,
//   mailingStreet: "Tinton Falls",
//   mailingCity: "Red Bank",
//   mailingZip: "08753",
//   mailingState: "New Jersey",
//   mailingCountry: "United States",
//   createdTime: "2022-04-13T17:30:32.534Z",
//   modifiedTime: "2022-04-13T17:35:41.872Z",
// };

const EditAttendeeInfo = () => {
  const { openSnackBar } = useSnackBar();
  const navigate = useNavigate();

  const { email } = useParams();

  const currentShow = useSelector(getCurrentShow) as Show;

  const [updateAttendee, results] = useUpdateAttendeeMutation();
  const { data, isLoading, isError } = useGetAttendeeByEmailQuery({
    email: email as string,
    showId: currentShow?.show_id as string,
  });

  const {
    data: contacts,
    isLoading: getContactsIsLoading,
    isError: getContactsIsError,
  } = useGetContactsQuery();

  if (isError || getContactsIsError) {
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
  if (isLoading || getContactsIsLoading || data === undefined) {
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
  const attendee = data.data;

  const handleSubmit = async (values: any) => {
    values.email = values.contact.email;
    values.account_id = values.contact.account_id;

    delete values.contact.address.facility;
    try {
      await updateAttendee({
        attendee: new Attendee(values),
        showId: currentShow?.show_id as string,
        email: values.email,
      }).unwrap();
      navigate(`/attendees`);
      openSnackBar({
        message: "Attendee successfully updated.",
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "success",
      });
    } catch (e: any) {
      openSnackBar({
        message: `Attendee cannot be updated. ${e.error}`,
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
        defaultValues={attendee}
        validationSchema={AttendeeSchema}
        onSubmit={handleSubmit}
      >
        <Header>Edit Attendee Information</Header>

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
            value={""}
            isDisabled
          />
        </Section>

        <Section name="Roles">
          <MultiSelect
            label="Roles"
            name="roles"
            selected={attendee.roles}
            options={roles}
          />
        </Section>
        <Section name="Attendance">
          <MultiSelect
            label="Days"
            name="attendance_days"
            selected={attendee.attendance_days}
            options={days}
          />
        </Section>

        <Section name="Attendee information">
          <AutoComplete
            label="Attendee"
            name="contact"
            // selected={attendee.days}
            options={contacts?.data as any[]}
            selected={attendee.contact as any}
          />
        </Section>

        <Actions>
          <SaveButton />
        </Actions>
      </Form>
    </PaperContent>
  );
};

export default EditAttendeeInfo;
