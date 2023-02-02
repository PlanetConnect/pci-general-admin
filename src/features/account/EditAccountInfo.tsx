import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress, Typography } from "@mui/material";
import { Account, AccountSchema } from "@pci/pci-services.types.account";
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
import { useSnackBar } from "~/app/templates/snackbar";
import {
  useGetAccountByIdQuery,
  useUpdateAccountMutation,
} from "~/services/queryApi";

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
  const { accountId } = useParams();
  const navigate = useNavigate();

  console.log(
    "🚀 ~ file: EditAccountInfo.tsx:43 ~ EditAccountInfo ~ accountId",
    accountId
  );

  const [updateAccount, results] = useUpdateAccountMutation();
  const {
    data: account,
    isLoading,
    isError,
  } = useGetAccountByIdQuery(accountId || "");
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
  if (isLoading || account === undefined) {
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
  console.log(
    "🚀 ~ file: EditAccountInfo.tsx:91 ~ EditAccountInfo ~ account",
    account
  );

  const defaultValues = new Account({ ...account?.data });
  console.log(
    "🚀 ~ file: EditAccountInfo.tsx:95 ~ EditAccountInfo ~ defaultValues",
    defaultValues
  );

  const handleSubmit = async (values: Account) => {
    console.log(values);
    // openSnackBar({
    //   message: "Account successfully updated.",
    //   position: {
    //     vertical: "top",
    //     horizontal: "center",
    //   },
    //   variant: "success",
    // });
    try {
      await updateAccount({ account: values, id: accountId || "" });

      openSnackBar({
        message: "Show successfully updated.",
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "success",
      });

      navigate(`/accounts`);
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
    <PaperContent>
      <Form
        size="md"
        defaultValues={defaultValues}
        validationSchema={AccountSchema}
        onSubmit={handleSubmit}
      >
        <Header>Edit Account Information</Header>

        <Section name="General information">
          <TextField type="text" label="Name" name="name" required />
          <TextField type="text" label="Website" name="website" required />
          <TextField type="text" label="Logo URL" name="logo_url" />
          <TextArea type="text" label="Description" name="description" />
        </Section>

        <Section name="Address">
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

export default EditAccountInfo;
