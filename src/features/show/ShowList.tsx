import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Show } from "@pci/pci-services.types.show";
import { useNavigate } from "react-router-dom";

import { PaperContent, Title } from "~/app/templates/content/";
import { DataTable } from "~/app/templates/datatable";
import { useSnackBar } from "~/app/templates/snackbar";
import {
  useCreateShowMutation,
  useGetMeQuery,
  useGetShowsQuery,
} from "~/services/queryApi";

import showListColumns from "./data/datatable/showListColumns";

const settings = {
  columnVisibility: { show_id: false, modified_time: false },
  isCheckBoxEnabled: false,
  pageSize: 25,
  rowIdField: "show_id",
};

function ShowList() {
  const navigate = useNavigate();
  const { openSnackBar } = useSnackBar();

  const { data: shows, isFetching, isLoading, isError } = useGetShowsQuery();
  const [createShow, results] = useCreateShowMutation();
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
        <Typography>Error Loading Shows</Typography>
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
  const newShows = shows?.data?.filter((show: Show) => {
    if (show.show_id) {
      return show;
    }
  });

  const onCreate = async () => {
    try {
      console.log("create new show");
      const createResult = await createShow({
        name: "New Show",
        setup: "hybrid",
        year: new Date().getFullYear(),
        start_date: new Date(),
        end_date: new Date(),
        validate: function (): Promise<void> {
          throw new Error("Function not implemented.");
        },
      }).unwrap();

      navigate(`/shows/${createResult?.data?.show_id}`);
    } catch (e: any) {
      openSnackBar({
        message: `Show cannot be created. ${e.data.error}`,
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
      <Title onCreate={onCreate}>Shows</Title>
      <DataTable
        columns={showListColumns}
        rows={newShows as any[]}
        settings={settings}
      />
    </PaperContent>
  );
}

export default ShowList;
