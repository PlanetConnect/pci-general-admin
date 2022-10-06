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

import accountSchema from "./data/form/accountSchema";

const account = {
  accountId: "b0193ac3-f988-464d-bf2e-8accdfba945b",
  name: "PlanetConnect Inc.",
  website: "https://events.planetconnect.com",
  type: null,
  logoUrl: "https://events.planetconnect.com/logo.png",
  tags: null,
  billingStreet: "1 Dr Drive",
  billingCity: "Boston",
  billingState: "MA",
  billingCode: "09876",
  billingCountry: "US",
  phone: null,
  description: "Test",
  createdTime: "2022-03-25 08:18:50.478628",
  modifiedTime: "2022-03-25 08:18:50.478628",
};

const EditAccountInfo = () => {
  const { openSnackBar } = useSnackBar();
  const handleSubmit = (values: any) => {
    console.log(values);
    openSnackBar({
      message: "Account successfully updated.",
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
        defaultValues={account}
        validationSchema={accountSchema}
        onSubmit={handleSubmit}
      >
        <Header>Edit Account Information</Header>

        <Section name="General information">
          <TextField type="text" label="Name" name="name" />
          <TextField type="text" label="Website" name="website" />
          <TextField type="text" label="Logo URL" name="logoUrl" />
          <TextArea type="text" label="Description" name="description" />
        </Section>

        <Section name="Address">
          <AddressField
            address={{
              address1: "billingStreet",
              city: "billingCity",
              state: "billingState",
              zip: "billingCode",
              country: "billingCountry",
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

export default EditAccountInfo;
