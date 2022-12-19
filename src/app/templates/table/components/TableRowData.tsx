import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

interface TableProps {
  data: any[];
  rows: {
    name: string;
    label: string;
  }[];
}

const TableRowData = ({ data, rows }: TableProps) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        {/* <TableHead>
          {rows.map((row) => (
            <TableCell key={row.name}>{row.label}</TableCell>
          ))}
        </TableHead> */}
        <TableBody>
          {data.map((row) => {
            const label = rows.find((r) => r.name === row.name);
            console.log(
              "🚀 ~ file: TableRowData.tsx:30 ~ {data.map ~ label",
              label
            );
            if (!label) {
              return null;
            }
            return (
              <TableRow key={row.name}>
                <TableCell key={`label_${row.name}`}>{label?.label}</TableCell>

                <TableCell key={`value_${row.name}`}>{row.value}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default TableRowData;
