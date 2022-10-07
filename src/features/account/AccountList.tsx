import { useState } from "react";

import { PaperContent, Title } from "~/app/templates/content/";
import { DataTable } from "~/app/templates/datatable";

import data from "./data/data";
import accountListColumns from "./data/datatable/accountListColumns";

const settings = {
  columnVisibility: { account_id: false },
  isCheckBoxEnabled: false,
  pageSize: 25,
  rowIdField: "account_id",
};

const AccountList = () => {
  const [accounts] = useState(data.records);

  return (
    <PaperContent>
      <Title>Accounts</Title>
      <DataTable
        columns={accountListColumns}
        rows={accounts}
        settings={settings}
      />
    </PaperContent>
  );
};

export default AccountList;
