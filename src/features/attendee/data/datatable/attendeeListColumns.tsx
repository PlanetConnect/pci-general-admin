import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Attendee } from "@pci/pci-services.types.attendee";
import { Link } from "react-router-dom";

import DeleteAttendee from "~/features/attendee/DeleteAttendee";

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
    valueGetter: (params: any) => {
      let result = [];
      if (params.row.contact) {
        if (params.row.contact.first_name) {
          result.push(params.row.contact.first_name);
        }
      } else {
        result = ["Unknown"];
      }
      return result.join(", ");
    },
  },
  {
    field: "last_name",
    headerName: "Last Name",
    width: 90,
    flex: 1,
    valueGetter: (params: any) => {
      let result = [];
      if (params.row.contact) {
        if (params.row.contact.last_name) {
          result.push(params.row.contact.last_name);
        }
      } else {
        result = ["Unknown"];
      }
      return result.join(", ");
    },
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
          to={`/attendees/${params.row.email}`}
          aria-label="edit"
          size="small"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <DeleteAttendee email={params.row.email} />
      </Stack>
    ),
  },
];

export default attendeeListColumns;
