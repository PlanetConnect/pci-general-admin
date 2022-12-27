import { DecodedToken } from "@pci/pci-services.types.decoded-token";
import { useSelector } from "react-redux";

import { PaperContent, Title } from "~/app/templates/content/";
import TableRowData from "~/app/templates/table/components/TableRowData";
import profileRows from "~/features/auth/data/datatable/profileRows";
import { getUser } from "~/features/auth/userSlice";

const settings = {
  columnVisibility: { field: false, modified_time: false },
  isCheckBoxEnabled: false,
  pageSize: 25,
  rowIdField: "field",
};

function Profile() {
  const user = useSelector(getUser);
  console.log("🚀 ~ file: Profile.tsx:10 ~ Profile ~ user", user);

  const data = [
    {
      name: "email",
      value: user?.username,
    },
  ];

  return (
    <PaperContent>
      <Title>Profile</Title>

      <TableRowData
        data={[...data, { name: "password", value: "********" }]}
        rows={profileRows}
        settings={settings}
      />
    </PaperContent>
  );
}

export default Profile;
