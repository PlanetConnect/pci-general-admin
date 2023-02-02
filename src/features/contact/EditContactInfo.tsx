import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Account } from "@pci/pci-services.types.account";
import { ContactSchema } from "@pci/pci-services.types.contact";
import { useNavigate, useParams } from "react-router-dom";

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
import SelectAccountAutoComplete from "~/app/templates/formbuilder/components/SelectAccountAutoComplete";
import { useSnackBar } from "~/app/templates/snackbar";
import {
  useGetAccountsQuery,
  useGetContactByEmailQuery,
  useUpdateContactMutation,
} from "~/services/queryApi";

import contactSchema from "./data/form/contactSchema";

const EditContactInfo = () => {
  const { openSnackBar } = useSnackBar();
  const navigate = useNavigate();

  const { email } = useParams();

  const {
    data,
    isLoading: isGetAccountsLoading,
    isError: isGetAccountsError,
  } = useGetAccountsQuery();
  const accounts = data?.data?.filter((account: Account) => {
    if (account.account_id) {
      return account;
    }
  });

  const [updateContact, results] = useUpdateContactMutation();
  const {
    data: contact,
    isLoading,
    isError,
  } = useGetContactByEmailQuery(email || "");
  if (isError || isGetAccountsError) {
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
  if (isLoading || isGetAccountsLoading || contact === undefined) {
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

  const selectedCompany = accounts?.find(
    (account) => account.account_id === contact?.data?.account_id
  );

  const defaultValues = {
    ...contact?.data,
    company: selectedCompany,
  };

  const handleSubmit = async (values: any) => {
    values.account_id = values.company.account_id;
    delete values.company;
    try {
      await updateContact({ contact: values, email: email || "" });
      navigate(`/contacts`);
      openSnackBar({
        message: "Contact successfully updated.",
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "success",
      });
    } catch (e: any) {
      console.log(
        "🚀 ~ file: EditContactInfo.tsx:115 ~ handleSubmit ~ error",
        e
      );
      openSnackBar({
        message: `Contact cannot be updated. ${e.data.error}`,
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
            name="company"
            options={accounts}
            selected={defaultValues.company}
          />
          <TextField type="text" label="Title" name="title" />
          <TextField type="text" label="Department" name="department" />
          <TextField type="text" label="Photo URL" name="photo_url" />
          <TextField type="text" label="LinkedIn URL" name="linked_in_url" />
          <TextArea type="text" label="Bio" name="bio" />
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

export default EditContactInfo;
