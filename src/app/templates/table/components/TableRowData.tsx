import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

import DataTableSettings from "~/app/templates/datatable/data/DataTableSettings";
import Row from "~/app/templates/datatable/data/Row";
// import ChangePassword from "~/features/auth/ChangePassword";

interface TableProps {
  data: any[];
  rows: Row[];
  settings: DataTableSettings;
}

const TableRowData = (props: TableProps) => {
  const [editPassword, setEditPassword] = useState(false);
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableBody>
          {props.data.map((row) => {
            const label: any = props.rows.find((r) => r.field === row.name);

            if (!label) {
              return null;
            }
            return (
              <TableRow key={row.name}>
                <TableCell key={`label_${row.name}`}>
                  {label?.headerName}
                </TableCell>

                {label.headerName !== "Password" && (
                  <TableCell key={`value_${row.name}`}>{row.value}</TableCell>
                )}

                {label.headerName === "Password" && editPassword && (
                  <TableCell key={`value_${row.name}`}>
                    Change Password
                    {/* <ChangePassword
                      onSubmit={() => {
                        setEditPassword(false);
                      }}
                    /> */}
                  </TableCell>
                )}
                {label.headerName === "Password" && !editPassword && (
                  <TableCell key={`value_${row.name}`}>{row.value}</TableCell>
                )}
                {label.headerName === "Password" && !editPassword && (
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={() => {
                        setEditPassword(true);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default TableRowData;
