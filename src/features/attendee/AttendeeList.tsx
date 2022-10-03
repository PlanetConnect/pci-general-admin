import { useState } from "react";

import { DataTable } from "../../app/templates/datatable";
import { PaperContent, Title } from "../../app/templates/content/";

import attendeeListColumns from "./data/datatable/attendeeListColumns";
import data from "./data/data";

const settings = {
  columnVisibility: { attendee_id: false },
  isCheckBoxEnabled: false,
  pageSize: 25,
  rowIdField: "attendee_id",
};

function AttendeeList() {
  const [attendees] = useState(data.records);

  return (
    <PaperContent>
      <Title>Attendees</Title>
      <DataTable
        columns={attendeeListColumns}
        rows={attendees}
        settings={settings}
      />
    </PaperContent>
  );
}

export default AttendeeList;
