import { useState } from "react";

import { PaperContent, Title } from "~/app/templates/content/";
import { DataTable } from "~/app/templates/datatable";

import data from "./data/data";
import roleListColumns from "./data/datatable/roleListColumns";

const settings = {
  columnVisibility: { role_id: false },
  isCheckBoxEnabled: false,
  pageSize: 25,
  rowIdField: "role_id",
};

const RoleList = () => {
  const [roles] = useState(data.records);

  return (
    <PaperContent>
      <Title>Roles</Title>
      <DataTable columns={roleListColumns} rows={roles} settings={settings} />
    </PaperContent>
  );
};

export default RoleList;
