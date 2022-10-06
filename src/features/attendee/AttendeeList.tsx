import { useState } from "react";

import { PaperContent, Title } from "../../app/templates/content/";
import { DataTable } from "../../app/templates/datatable";
import data from "./data/data";
import attendeeListColumns from "./data/datatable/attendeeListColumns";

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
