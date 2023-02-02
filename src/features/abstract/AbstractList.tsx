import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Show } from "@pci/pci-services.types.show";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PaperContent, Title } from "~/app/templates/content/";
import { DataTable } from "~/app/templates/datatable";
import { useSnackBar } from "~/app/templates/snackbar";
import { getCurrentShow } from "~/features/persist/persistSlice";
import { useGetAbstractByShowIdQuery } from "~/services/queryApi";

import data from "./data/data";
import abstractListColumns from "./data/datatable/abstractListColumns";

const settings = {
  columnVisibility: { abstract_id: false, modified_time: false },
  isCheckBoxEnabled: false,
  pageSize: 25,
  rowIdField: "abstract_id",
};

function AbstractList() {
  // const [abstracts] = useState(data.records);
  const navigate = useNavigate();
  const { openSnackBar } = useSnackBar();
  const currentShow = useSelector(getCurrentShow) as Show;

  if (!currentShow) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <ErrorIcon color="error" />
        <Typography>Please select a show first</Typography>
      </div>
    );
  }
  const {
    data: abstracts,
    isLoading,
    isError,
  } = useGetAbstractByShowIdQuery(currentShow?.show_id as string);
  console.log(
    "🚀 ~ file: AbstractList.tsx:48 ~ AbstractList ~ shows",
    abstracts
  );
  if (isError) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <ErrorIcon color="error" />
        <Typography>Error Loading Abstracts</Typography>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <CircularProgress />
        <Typography>Loading...</Typography>
      </div>
    );
  }

  const onCreate = async () => {
    try {
      navigate(`/abstracts/createAbstract`);
    } catch (e: any) {
      openSnackBar({
        message: `A cannot be created. ${e.data.error}`,
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "error",
      });
    }
  };
  return (
    <PaperContent>
      <Title onCreate={onCreate}>Abstracts</Title>
      <DataTable
        columns={abstractListColumns}
        rows={abstracts?.data as any[]}
        settings={settings}
      />
    </PaperContent>
  );
}

export default AbstractList;
