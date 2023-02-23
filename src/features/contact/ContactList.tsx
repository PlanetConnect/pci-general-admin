import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Contact } from "@pci/pci-services.types.contact";
import { useNavigate } from "react-router-dom";

import { PaperContent, Title } from "~/app/templates/content/";
import { DataTable } from "~/app/templates/datatable";
import { useSnackBar } from "~/app/templates/snackbar";
import { useGetContactsQuery } from "~/services/queryApi";

import contactListColumns from "./data/datatable/contactListColumns";

const settings = {
  columnVisibility: { contact_id: false },
  isCheckBoxEnabled: false,
  pageSize: 25,
  rowIdField: "email",
};

function ContactList() {
  const navigate = useNavigate();
  const { openSnackBar } = useSnackBar();

  const { data, isLoading, isError } = useGetContactsQuery();

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
        <Typography>Error Loading Contacts</Typography>
      </div>
    );
  }
  if (isLoading) {
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
  const contacts = data?.data?.filter((contact: Contact) => {
    if (contact.email) {
      return contact;
    }
  });

  const onCreate = async () => {
    try {
      navigate(`/contacts/createContact`);
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
      <Title onCreate={onCreate}>Contacts</Title>
      <DataTable
        columns={contactListColumns}
        rows={contacts as any[]}
        settings={settings}
      />
    </PaperContent>
  );
}

export default ContactList;
