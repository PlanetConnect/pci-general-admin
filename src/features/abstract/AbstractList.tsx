import { useState } from "react";

import { PaperContent, Title } from "~/app/templates/content/";
import { DataTable } from "~/app/templates/datatable";

import data from "./data/data";
import abstractListColumns from "./data/datatable/abstractListColumns";

const settings = {
  columnVisibility: { abstract_id: false, modified_time: false },
  isCheckBoxEnabled: false,
  pageSize: 25,
  rowIdField: "abstract_id",
};

function AbstractList() {
  const [abstracts] = useState(data.records);

  return (
    <PaperContent>
      <Title>Abstracts</Title>
      <DataTable
        columns={abstractListColumns}
        rows={abstracts}
        settings={settings}
      />
    </PaperContent>
  );
}

export default AbstractList;
