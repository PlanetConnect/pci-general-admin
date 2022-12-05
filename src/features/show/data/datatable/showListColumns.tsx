import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

import DeleteShow from "../../DeleteShow";

const showListColumns = [
  {
    field: "show_id",
    headerName: "Show ID",
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
    field: "year",
    headerName: "Year",
    width: 50,
    flex: 1,
  },
  {
    field: "setup",
    headerName: "Setup",
    width: 90,
    flex: 1,
  },
  {
    field: "start_date",
    headerName: "Start Date",
    type: "date",
    width: 90,
    flex: 1,
  },
  {
    field: "end_date",
    headerName: "End Date",
    type: "date",
    width: 90,
    flex: 1,
  },
  {
    field: "is_active",
    headerName: "Is Active?",
    type: "boolean",
    width: 90,
    flex: 0,
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
          to={`/shows/${params.row.show_id.replace("SHOW#", "")}`}
          aria-label="edit"
          size="small"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <DeleteShow
          showId={params.row.show_id.replace("SHOW#", "")}
          showName={params.row.name}
        />
      </Stack>
    ),
  },
];

export default showListColumns;
