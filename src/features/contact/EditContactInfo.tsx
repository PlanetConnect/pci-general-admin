import Stack from "@mui/material/Stack";

import { SaveButton } from "~/app/templates/button";
import { PaperContent } from "~/app/templates/content/";
import {
  Actions,
  AddressField,
  Form,
  Header,
  Section,
  TextArea,
  TextField,
} from "~/app/templates/formbuilder";
import { useSnackBar } from "~/app/templates/snackbar";

import contactSchema from "./data/form/contactSchema";

const contact = {
  contact_id: "5caa8244-cc26-4725-bf42-91fd7b27cdba",
  firstName: "Jamesh",
  lastName: "Vindua",
  email: "jvindua@planetconnect.com",
  accountId: "b0193ac3-f988-464d-bf2e-8accdfba945b",
  title: "Programmer",
  department: "Test",
  site: "Bonham",
  photoUrl:
    "https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg",
  linkedInUrl: "https://www.linkedin.com/in/jamesh-vindua-85aa3380/",
  expertiseArea: "Programming,Testing,Software Development",
  phone: "7326643146",
  bio: "Biological test methods describe standardized experiments that determine the toxicity of a substance or material by evaluating its effect on living organisms. Tests are designed to use appropriate organisms and sensitive effect measurements in the media of interest for a specified test duration.",
  mailingStreet: "83 Walnut St.",
  mailingCity: "Loneham",
  mailingState: "NJ",
  mailingZip: "09762",
  mailingCountry: "US",
  createdTime: "2022-03-25 08:15:31.930392",
  modifiedTime: "2022-03-25 08:15:31.930392",
};

const EditContactInfo = () => {
  const { openSnackBar } = useSnackBar();
  const handleSubmit = (values: any) => {
    console.log(values);
    openSnackBar({
      message: "Contact successfully updated.",
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
        size="lg"
        defaultValues={contact}
        validationSchema={contactSchema}
        onSubmit={handleSubmit}
      >
        <Header>Edit Contact Information</Header>

        <Section name="General information">
          <Stack direction="row" spacing={2}>
            <TextField type="text" label="First Name" name="firstName" />
            <TextField type="text" label="Last Name" name="lastName" />
          </Stack>
          <TextField type="text" label="Email" name="email" />
          <TextField type="text" label="Title" name="title" />
          <TextField type="text" label="Department" name="department" />
          <TextField type="text" label="Photo URL" name="photoUrl" />
          <TextField type="text" label="LinkedIn URL" name="linkedInUrl" />
          <TextArea type="text" label="Bio" name="bio" />
        </Section>

        <Section name="Address">
          <TextField type="text" label="Site" name="site" />
          <AddressField
            address={{
              address1: "mailingStreet",
              city: "mailingCity",
              state: "mailingState",
              zip: "mailingZip",
              country: "mailingCountry",
            }}
          />
        </Section>
        <Actions>
          <SaveButton />
        </Actions>
      </Form>
    </PaperContent>
  );
};

export default EditContactInfo;
