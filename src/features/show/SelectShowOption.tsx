import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSelector } from "react-redux";

import { useAppDispatch } from "~/app/hooks";
import {
  getCurrentShowId,
  setCurrentShowId,
} from "~/features/persist/persistSlice";
import { useGetShowsQuery } from "~/services/queryApi";

const SelectShowOption = () => {
  const { data, isLoading, isError } = useGetShowsQuery();
  const dispatch = useAppDispatch();
  const currentShowId = useSelector(getCurrentShowId);

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
        <Typography>Error Fetching Information</Typography>
      </div>
    );
  }
  if (isLoading || data === undefined || !currentShowId) {
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

  // TODO: sort/ reorganize data
  const shows = data?.data;

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedShow = shows?.find(
      (show) => show.show_id === event.target.value
    );
    if (selectedShow?.show_id) dispatch(setCurrentShowId(selectedShow.show_id));
  };
  return (
    <FormControl sx={{ minWidth: 250 }} size="small">
      <InputLabel htmlFor="grouped-show-select">Select a Show</InputLabel>
      <Select
        value={currentShowId}
        id="grouped-show-select"
        label="Select a show"
        autoWidth
        sx={{ color: "#fff" }}
        onChange={handleChange}
      >
        {shows?.map((show) => (
          <MenuItem key={`show_${show.show_id}`} value={show.show_id}>
            {show.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectShowOption;
