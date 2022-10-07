import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const exhibitionListColumns = [
  {
    field: "exhibition_id",
    headerName: "exhibition ID",
    width: 150,
    flex: 1,
  },
  {
    field: "show_id",
    headerName: "Show",
    width: 150,
    flex: 1,
  },
  {
    field: "account_id",
    headerName: "Account",
    width: 100,
    flex: 1,
  },
  {
    field: "display_name",
    headerName: "Company Name For Booth",
    width: 100,
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
          to={`/exhibitions/${params.row.exhibition_id}`}
          aria-label="edit"
          size="small"
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Stack>
    ),
  },
];

export default exhibitionListColumns;
