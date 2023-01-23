import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

import DeleteContact from "~/features/contact/DeleteContact";

const contactListColumns = [
  {
    field: "contact_id",
    headerName: "contact ID",
    width: 150,
    flex: 1,
  },
  {
    field: "first_name",
    headerName: "First Name",
    width: 150,
    flex: 1,
  },
  {
    field: "last_name",
    headerName: "Last Name",
    width: 150,
    flex: 1,
  },
  {
    field: "account_id",
    headerName: "Account",
    width: 90,
    flex: 1,
  },
  {
    field: "title",
    headerName: "Title",
    type: "date",
    width: 150,
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    type: "date",
    width: 100,
    flex: 1,
  },
  {
    field: "department",
    headerName: "Department",
    type: "string",
    width: 150,
    flex: 0,
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
          to={`/contacts/${params.row.email}`}
          aria-label="edit"
          size="small"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <DeleteContact
          email={params.row.email}
          accountName={params.row.firstName}
        />
      </Stack>
    ),
  },
];

export default contactListColumns;
