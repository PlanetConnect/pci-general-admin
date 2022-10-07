import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const attendeeListColumns = [
  {
    field: "attendee_id",
    headerName: "attendee ID",
    width: 150,
    flex: 1,
  },
  {
    field: "badge_key",
    headerName: "Badge Key",
    width: 90,
    flex: 1,
  },
  {
    field: "show_name",
    headerName: "Show Name",
    width: 150,
    flex: 1,
  },
  {
    field: "attendee_acount_name",
    headerName: "Account Name",
    width: 150,
    flex: 1,
  },
  {
    field: "first_name",
    headerName: "First Name",
    width: 90,
    flex: 1,
  },
  {
    field: "last_name",
    headerName: "Last Name",
    width: 90,
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
          to={`/attendees/${params.row.attendee_id}`}
          aria-label="edit"
          size="small"
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Stack>
    ),
  },
];

export default attendeeListColumns;
