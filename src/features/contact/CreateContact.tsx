import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Account } from "@pci/pci-services.types.account";
import {
  Contact,
  ContactProps,
  ContactSchema,
} from "@pci/pci-services.types.contact";
import { useNavigate } from "react-router-dom";

import { SaveButton } from "~/app/templates/button";
import { PaperContent } from "~/app/templates/content/";
import {
  Actions,
  AddressField,
  Form,
  Header,
  Section,
  TextField,
} from "~/app/templates/formbuilder";
import SelectAccountAutoComplete from "~/app/templates/formbuilder/components/SelectAccountAutoComplete";
import { useSnackBar } from "~/app/templates/snackbar";
import {
  useCreateContactMutation,
  useGetAccountsQuery,
} from "~/services/queryApi";

const CreateContact = () => {
  const { openSnackBar } = useSnackBar();
  const navigate = useNavigate();

  const [createContact, results] = useCreateContactMutation();
  const { data, isLoading, isError, error } = useGetAccountsQuery();
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
  if (isLoading || data === undefined) {
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
  const accounts = data?.data?.filter((account: Account) => {
    if (account.account_id) {
      return account;
    }
  });

  const defaultValues = new Contact({
    first_name: "",
    last_name: "",
    email: "",
    title: "",
    department: "",
    site: "",
    photo_url: "",
    linked_in_url: "",
    expertise_area: "",
    phone: "",
    address: {},
  });

  const handleSubmit = async (values: ContactProps) => {
    try {
      await createContact(new Contact(values)).unwrap();
      navigate(`/contacts`);
      openSnackBar({
        message: "Contact successfully created.",
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "success",
      });
    } catch (e: any) {
      openSnackBar({
        message: `Contact cannot be created. ${e.data.error}`,
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
        size="lg"
        defaultValues={defaultValues}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
      >
        <Header>Edit Contact Information</Header>

        <Section name="General information">
          <Stack direction="row" spacing={2}>
            <TextField type="text" label="First Name" name="first_name" />
            <TextField type="text" label="Last Name" name="last_name" />
          </Stack>
          <TextField type="text" label="Email" name="email" />
          <SelectAccountAutoComplete
            label="Company"
            name="account_id"
            options={accounts}
            selected={undefined}
          />
          <TextField type="text" label="Title" name="title" />
          <TextField type="text" label="Department" name="department" />
          <TextField type="text" label="Photo URL" name="photo_url" />
          <TextField type="text" label="LinkedIn URL" name="linked_in_url" />
        </Section>

        <Section name="Address">
          <TextField type="text" label="Site" name="site" />
          <AddressField
            address={{
              address1: "address.street",
              city: "address.city",
              state: "address.state",
              zip: "address.zip",
              country: "address.country",
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

export default CreateContact;
