import { DecodedToken } from "@pci/pci-services.types.decoded-token";
import { useSelector } from "react-redux";

import { PaperContent, Title } from "~/app/templates/content/";
import TableRowData from "~/app/templates/table/components/TableRowData";
import { getUser } from "~/features/auth/userSlice";

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
