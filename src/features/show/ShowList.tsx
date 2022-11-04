import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PaperContent, Title } from "~/app/templates/content/";
import { DataTable } from "~/app/templates/datatable";
import { useCreateShowMutation, useGetShowsQuery } from "~/services/queryApi";

import data from "./data/data";
import showListColumns from "./data/datatable/showListColumns";

const settings = {
  columnVisibility: { show_id: false, modified_time: false },
  isCheckBoxEnabled: false,
  pageSize: 25,
  rowIdField: "pk",
};

function ShowList() {
  // const [shows] = useState(data.records);
  // const shows = useState(data.records);
  const navigate = useNavigate();
  const { data: shows, isFetching, isLoading, isError } = useGetShowsQuery();
  const [createShow, results] = useCreateShowMutation();

  console.log("🚀 ~ file: ShowList.tsx ~ line 21 ~ ShowList ~ shows", shows);
  if (isLoading) {
    return <div>loading</div>;
  }

  const onCreate = async () => {
    console.log("create new show");
    const createResult = await createShow({
      name: "New Show",
      setup: "hybrid",
      isActive: false,
      showId: "",
      year: new Date().getFullYear(),
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      createdTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString(),
    });
    console.log(
      "🚀 ~ file: ShowList.tsx ~ line 41 ~ onCreate ~ createResult",
      createResult
    );

    if (createResult.error) {
      console.log("error creating show", createResult.error);
    } else {
      navigate(`/shows/${createResult.data?.inserted_id}`);
    }
  };
  return (
    <PaperContent>
      <Title onCreate={onCreate}>Shows</Title>
      <DataTable
        columns={showListColumns}
        rows={shows.data as any[]}
        settings={settings}
      />
    </PaperContent>
  );
}

export default ShowList;
