import ColumnVisiblity from "./ColumnVisibility";

interface DataTableSettings {
  columnVisibility: ColumnVisiblity;
  isCheckBoxEnabled: boolean;
  pageSize: number;
  rowIdField: string;
}

export default DataTableSettings;
