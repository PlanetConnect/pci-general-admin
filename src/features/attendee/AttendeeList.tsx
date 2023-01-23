import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Attendee } from "@pci/pci-services.types.attendee";
import { Show } from "@pci/pci-services.types.show";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PaperContent, Title } from "~/app/templates/content/";
import { DataTable } from "~/app/templates/datatable";
import { useSnackBar } from "~/app/templates/snackbar";
import { getCurrentShow } from "~/features/auth/authSlice";
import { getUser } from "~/features/auth/userSlice";
import {
  useCreateAttendeeMutation,
  useGetAttendeeByEmailQuery,
  useGetAttendeeByShowQuery,
} from "~/services/queryApi";

import data from "./data/data";
import attendeeListColumns from "./data/datatable/attendeeListColumns";

const settings = {
  columnVisibility: { attendee_id: false },
  isCheckBoxEnabled: false,
  pageSize: 25,
  rowIdField: "email",
};

function AttendeeList() {
  // const [attendees] = useState(data.records);
  const navigate = useNavigate();
  const { openSnackBar } = useSnackBar();

  const currentShow = useSelector(getCurrentShow) as Show;
  console.log(
    "🚀 ~ file: AttendeeList.tsx:32 ~ AttendeeList ~ currentShow",
    currentShow
  );

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

  const { data, isLoading, isError, error } = useGetAttendeeByShowQuery(
    currentShow?.show_id as string
  );
  console.log(
    "🚀 ~ file: AttendeeList.tsx:44 ~ AttendeeList ~ attendeews",
    data
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
        <Typography>Error Loading Attendee:</Typography>
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

  const attendees = data?.data?.filter((attendee: Attendee) => {
    if (attendee.email) {
      return attendee;
    }
  });

  const onCreate = async () => {
    try {
      console.log("create new attendee");
      navigate(`/attendees/createAttendee`);
    } catch (e: any) {
      openSnackBar({
        message: `Attendee cannot be created. ${e.data.error}`,
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
      <Title onCreate={onCreate}>Attendees</Title>
      <DataTable
        columns={attendeeListColumns}
        rows={attendees as any[]}
        settings={settings}
      />
    </PaperContent>
  );
}

export default AttendeeList;
