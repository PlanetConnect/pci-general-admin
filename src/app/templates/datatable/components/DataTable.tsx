import {
  DataGrid,
  GridColumnVisibilityModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { useState } from "react";

import Column from "../data/Column";
import DataTableSettings from "../data/DataTableSettings";
import Row from "../data/Row";
import styles from "../data/styles";

interface DataTableProps {
  columns: Column[];
  rows: Row[];
  settings: DataTableSettings;
}

const DataTable = (props: DataTableProps) => {
  console.log("🚀 ~ file: DataTable.tsx:20 ~ DataTable ~ props", props);
  // eslint-disable-next-line
  const [checkboxSelection, setCheckboxSelection] = useState(
    props.settings.isCheckBoxEnabled
  );
  const [pageSize, setPageSize] = useState(props.settings.pageSize);
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(props.settings.columnVisibility);

  const handleGetRowId = (row: Row) => {
    return row[props.settings.rowIdField] as number;
  };

  return (
    <div style={{ height: 700, width: "100%" }}>
      <div style={{ display: "flex", height: "100%", width: "100%" }}>
        <DataGrid
          checkboxSelection={checkboxSelection}
          columns={props.columns}
          columnVisibilityModel={columnVisibilityModel}
          components={{
            Toolbar: GridToolbar,
          }}
          disableColumnMenu
          disableSelectionOnClick
          getRowId={handleGetRowId}
          pageSize={pageSize}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
          rows={props.rows}
          sx={styles}
        />
      </div>
    </div>
  );
};

export default DataTable;
