import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

import DeleteAccount from "~/features/account/DeleteAccount";

const accountListColumns = [
  {
    field: "account_id",
    headerName: "Account ID",
    width: 150,
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    flex: 1,
  },
  {
    field: "website",
    headerName: "Website",
    width: 50,
    flex: 1,
  },
  {
    field: "created_time",
    headerName: "Created Time",
    type: "dateTime",
    width: 150,
    flex: 1,
  },
  {
    field: "modified_time",
    headerName: "Modified Time",
    type: "dateTime",
    width: 150,
    flex: 1,
  },
  {
    field: "actions",
    headerName: "Actions",
    headerAlign: "center",
    align: "center",
    width: 100,
    flex: 1,
    sortable: false,
    renderCell: (params: any) => (
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          component={Link}
          to={`/accounts/${params.row.account_id}`}
          aria-label="edit"
          size="small"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <DeleteAccount
          accountId={params.row.account_id}
          accountName={params.row.name}
        />
      </Stack>
    ),
  },
];

export default accountListColumns;
