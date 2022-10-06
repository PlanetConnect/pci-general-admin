import { useState } from "react";

import { PaperContent, Title } from "../../app/templates/content/";
import { DataTable } from "../../app/templates/datatable";
import data from "./data/data";
import contactListColumns from "./data/datatable/contactListColumns";

const settings = {
  columnVisibility: { contact_id: false },
  isCheckBoxEnabled: false,
  pageSize: 25,
  rowIdField: "contact_id",
};

function ContactList() {
  const [contacts] = useState(data.records);

  return (
    <PaperContent>
      <Title>Contacts</Title>
      <DataTable
        columns={contactListColumns}
        rows={contacts}
        settings={settings}
      />
    </PaperContent>
  );
}

export default ContactList;
