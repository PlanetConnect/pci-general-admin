import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Booth } from "@pci/pci-services.types.booth";
import { Show } from "@pci/pci-services.types.show";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PaperContent, Title } from "~/app/templates/content/";
import { DataTable } from "~/app/templates/datatable";
import { useSnackBar } from "~/app/templates/snackbar";
import { getCurrentShow } from "~/features/auth/authSlice";
import { useGetBoothsByShowQuery } from "~/services/queryApi";

import exhibitionListColumns from "./data/datatable/exhibitionListColumns";

const settings = {
  columnVisibility: { exhibition_id: false },
  isCheckBoxEnabled: false,
  pageSize: 25,
  rowIdField: "booth_id",
};

function ExhibitionList() {
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
    data: booths,
    isLoading,
    isError,
  } = useGetBoothsByShowQuery(currentShow?.show_id as string);
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
        <Typography>Error Loading Booths</Typography>
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
  const exhibitions = booths?.data?.filter((booth: Booth) => {
    if (booth.booth_id) {
      return booth;
    }
  });

  const onCreate = async () => {
    try {
      navigate(`/booths/createExhibit`);
    } catch (e: any) {
      openSnackBar({
        message: `Exhibit cannot be created. ${e.data.error}`,
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
      <Title onCreate={onCreate}>Exhibitions</Title>
      <DataTable
        columns={exhibitionListColumns}
        rows={exhibitions as any[]}
        settings={settings}
      />
    </PaperContent>
  );
}

export default ExhibitionList;
