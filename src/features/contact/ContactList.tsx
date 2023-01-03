import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Contact } from "@pci/pci-services.types.contact";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PaperContent, Title } from "~/app/templates/content/";
import { DataTable } from "~/app/templates/datatable";
import { useSnackBar } from "~/app/templates/snackbar";
import {
  useCreateContactMutation,
  useGetContactsQuery,
} from "~/services/queryApi";

import data from "./data/data";
import contactListColumns from "./data/datatable/contactListColumns";

const settings = {
  columnVisibility: { contact_id: false },
  isCheckBoxEnabled: false,
  pageSize: 25,
  rowIdField: "email",
};

function ContactList() {
  // const [contacts] = useState(data.records);
  const navigate = useNavigate();
  const { openSnackBar } = useSnackBar();

  const { data, isLoading, isError, error } = useGetContactsQuery();
  const [createContact, results] = useCreateContactMutation();

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
        <Typography>Error Loading Contacts:</Typography>
        <Typography>{error?.error}</Typography>
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
  console.log("🚀 ~ file: ContactList.tsx:21 ~ ContactList ~ data", data);
  const contacts = data?.data?.filter((contact: Contact) => {
    if (contact.email) {
      return contact;
    }
  });
  console.log("🚀 ~ file: ContactList.tsx:23 ~ contacts ~ contacts", contacts);

  const onCreate = async () => {
    try {
      console.log("create new contact");
      // const createResult = await createContact({
      //   first_name: "Jane",
      //   last_name: "Doe",
      //   email: "example@email.com",
      //   validate: function (): Promise<void> {
      //     throw new Error("Function not implemented.");
      //   },
      // }).unwrap();
      // console.log(
      //   "🚀 ~ file: ContactList.tsx:86 ~ onCreate ~ createResult",
      //   createResult
      // );

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
