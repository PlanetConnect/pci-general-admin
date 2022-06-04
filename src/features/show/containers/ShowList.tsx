import { useState } from "react";

import { DataTable } from "../../../app/templates/datatable";
import { PaperContent, Title } from "../../../app/templates/content/";

import dataTableColumns from "../data/datatable/dataTableColumns";
import data from "../data/data";

const settings = {
  columnVisibility: { show_id: false, modified_time: false },
  isCheckBoxEnabled: false,
  pageSize: 25,
  rowIdField: "show_id",
};

function ShowList() {
  const [shows] = useState(data.records);

  return (
    <PaperContent>
      <Title>Shows</Title>
      <DataTable columns={dataTableColumns} rows={shows} settings={settings} />
    </PaperContent>
  );
}

export default ShowList;
