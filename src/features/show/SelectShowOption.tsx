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

  // useEffect(() => {

  // }, [currentShowId, data])

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
  // console.log(
  //   "🚀 ~ file: SelectShowOption.tsx:16 ~ SelectShowOption ~ shows",
  //   shows
  // );
  // const shows = data?.data?.map((show) => {
  //   if()

  // })
  const handleChange = (event: SelectChangeEvent<string>) => {
    console.log(
      "🚀 ~ file: SelectShowOption.tsx:22 ~ handleChange ~ event.target.value",
      event.target.value
    );
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
        {/* <ListSubheader>Merck</ListSubheader>
        <MenuItem value={1}>2022 Merck Technology Symposium</MenuItem>
        <MenuItem value={2}>2022 Merck Imaging Symposium</MenuItem>
        <ListSubheader>Sanofi</ListSubheader>
        <MenuItem value={3}>2022 Sanofi Global Symposium</MenuItem> */}
      </Select>
    </FormControl>
  );
};

export default SelectShowOption;
