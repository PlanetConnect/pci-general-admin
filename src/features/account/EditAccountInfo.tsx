import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress, Typography } from "@mui/material";
import {
  Account,
  AccountProps,
  AccountSchema,
} from "@pci/pci-services.types.account";
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

const EditAccountInfo = () => {
  const { openSnackBar } = useSnackBar();
  const { accountId } = useParams();
  const navigate = useNavigate();

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

  const defaultValues = new Account({ ...account?.data });

  const handleSubmit = async (values: AccountProps) => {
    try {
      await updateAccount({
        account: new Account(values),
        id: accountId || "",
      });

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
