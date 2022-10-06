import { useState } from "react";

import { PaperContent, Title } from "../../app/templates/content/";
import { DataTable } from "../../app/templates/datatable";
import data from "./data/data";
import exhibitionListColumns from "./data/datatable/exhibitionListColumns";

const settings = {
  columnVisibility: { exhibition_id: false },
  isCheckBoxEnabled: false,
  pageSize: 25,
  rowIdField: "exhibition_id",
};

function ExhibitionList() {
  const [exhibitions] = useState(data.records);

  return (
    <PaperContent>
      <Title>Exhibitions</Title>
      <DataTable
        columns={exhibitionListColumns}
        rows={exhibitions}
        settings={settings}
      />
    </PaperContent>
  );
}

export default ExhibitionList;
