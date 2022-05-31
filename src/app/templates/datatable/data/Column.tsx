interface Column {
  field: string;
  headerName?: string;
  width?: number;
  flex?: number;
  type?: string;
  getActions?: any;
  renderCell?: any;
}

export default Column;
