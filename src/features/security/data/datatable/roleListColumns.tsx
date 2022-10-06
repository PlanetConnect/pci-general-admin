import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const roleListColumns = [
  {
    field: "role_id",
    headerName: "role ID",
    width: 150,
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    width: 100,
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
    flex: 1,
  },
  {
    field: "is_active",
    headerName: "Is Active?",
    type: "boolean",
    width: 50,
    flex: 1,
  },
  {
    field: "created_time",
    headerName: "Created Time",
    type: "dateTime",
    width: 70,
    flex: 1,
  },
  {
    field: "modified_time",
    headerName: "Modified Time",
    type: "dateTime",
    width: 70,
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
          to={`/roles/${params.row.role_id}`}
          aria-label="edit"
          size="small"
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Stack>
    ),
  },
];

export default roleListColumns;
