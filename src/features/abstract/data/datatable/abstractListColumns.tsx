import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const abstractListColumns = [
  {
    field: "abstract_id",
    headerName: "abstract ID",
    width: 150,
    flex: 1,
  },
  {
    field: "seq_no",
    headerName: "Seq No.",
    width: 50,
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    width: 50,
    flex: 1,
  },
  {
    field: "show_name",
    headerName: "Show",
    width: 100,
    flex: 1,
  },
  {
    field: "account_name",
    headerName: "Account",
    width: 100,
    flex: 1,
  },
  {
    field: "accepted_type",
    headerName: "Accepted Type",
    width: 90,
    flex: 1,
  },
  {
    field: "is_public",
    headerName: "Is Public?",
    type: "boolean",
    width: 90,
    flex: 0,
  },
  {
    field: "title",
    headerName: "Title",
    width: 100,
    flex: 1,
  },
  {
    field: "topic",
    headerName: "Topic",
    width: 100,
    flex: 1,
  },
  {
    field: "created_time",
    headerName: "Submission Time",
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
          to={`/abstracts/${params.row.abstract_id}`}
          aria-label="edit"
          size="small"
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Stack>
    ),
  },
];

export default abstractListColumns;
