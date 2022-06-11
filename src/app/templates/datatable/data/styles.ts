const styles = {
  "& .MuiDataGrid-cell:hover": {
    color: "primary.main",
  },
  "& .MuiDataGrid-columnHeaders, .MuiDataGrid-toolbarContainer, .MuiDataGrid-footerContainer":
    {
      backgroundColor: "#f8f9fa",
    },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 800,
  },
  "& .MuiDataGrid-columnSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus, .MuiDataGrid-columnHeader--sortable, .MuiDataGrid-cell":
    {
      outline: "none !important",
    },
};

export default styles;
