import Stack from "@mui/material/Stack";

import { PaperContent } from "../../app/templates/content/";
import {
  Actions,
  Form,
  Header,
  MultiSelect,
  Section,
  TextField,
} from "../../app/templates/formbuilder";
import { useSnackBar } from "../../app/templates/snackbar";
import { SaveButton } from "../../app/templates/button";

import attendeeSchema from "./data/form/attendeeSchema";
import roles from "./data/form/roles";
import days from "./data/form/days";

const attendee = {
  attendeeId: "5276827c-0d59-4416-a4ac-f1444a1f93c2",
  showId: "5df3b780-ac2e-48b4-9d55-169ab523ac0a",
  showName: "Test Show",
  attendeeAccountId: "b0193ac3-f988-464d-bf2e-8accdfba945b",
  attendeeAcountName: "PlanetConnect Inc.",
  badgeKey: "1649871031818",
  contactId: "c29ba4b7-0150-45dc-b0aa-d125634eb6f2",
  roles: [
    "43da751a-50db-43ad-b74d-818cbb77b37e",
    "496c6b4a-bbe3-464c-8782-d9ff8f53aa1a",
    "81107b52-e46b-4c31-8e6a-4c1e2e46f896",
  ],
  days: ["Physical Day 2", "Virtual Day 1"],
  firstName: "John",
  lastName: "Tester",
  contactAccountId: "b0193ac3-f988-464d-bf2e-8accdfba945b",
  contactAccountName: "PlanetConnect Inc.",
  title: "Marketing Leader",
  department: "Test Department",
  site: "Testing Site",
  linkedInUrl: "https://github.com/aws-samples/cookiecutter-aws-sam-pipeline",
  expertiseArea: "programming,eating",
  phone: "+17326643146",
  bio: null,
  mailingStreet: "Tinton Falls",
  mailingCity: "Red Bank",
  mailingZip: "08753",
  mailingState: "New Jersey",
  mailingCountry: "United States",
  createdTime: "2022-04-13T17:30:32.534Z",
  modifiedTime: "2022-04-13T17:35:41.872Z",
};

const EditAttendeeInfo = () => {
  const { openSnackBar } = useSnackBar();
  const handleSubmit = (values: any) => {
    console.log(values);
    openSnackBar({
      message: "Attendee successfully updated.",
      position: {
        vertical: "top",
        horizontal: "center",
      },
      variant: "success",
    });
  };
  return (
    <PaperContent>
      <Form
        size="md"
        defaultValues={attendee}
        validationSchema={attendeeSchema}
        onSubmit={handleSubmit}
      >
        <Header>Edit Attendee Information</Header>

        <Section name="Show information">
          <TextField type="text" label="Badge Key" name="badgeKey" isDisabled />
          <TextField type="text" label="Show" name="showName" isDisabled />
          <TextField
            type="text"
            label="Company"
            name="attendeeAcountName"
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
            name="days"
            selected={attendee.days}
            options={days}
          />
        </Section>

        <Section name="Attendee information">
          <Stack direction="row" spacing={2}>
            <TextField type="text" label="First Name" name="firstName" />
            <TextField type="text" label="Last Name" name="lastName" />
          </Stack>
          <TextField type="text" label="Title" name="title" />
          <TextField type="text" label="Department" name="department" />
          <TextField type="text" label="Site" name="site" />
          <TextField type="text" label="LinkedIn URL" name="linkedInUrl" />
        </Section>

        <Actions>
          <SaveButton />
        </Actions>
      </Form>
    </PaperContent>
  );
};

export default EditAttendeeInfo;
