import { useSelector } from "react-redux";

import { PaperContent, Title } from "~/app/templates/content/";
import TableRowData from "~/app/templates/table/components/TableRowData";
import { getUser } from "~/features/auth/userSlice";

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
        data={data}
        rows={[
          {
            name: "username",
            label: "Username",
          },
          {
            name: "Email",
            label: "Email",
          },
        ]}
      />
    </PaperContent>
  );
}

export default Profile;
