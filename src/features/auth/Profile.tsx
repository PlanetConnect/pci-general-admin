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

  const data = Object.keys(user.data).map((item: any) => {
    return {
      name: item,
      value: user.data[item],
    };
  });

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
