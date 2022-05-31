import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const SelectShowOption = () => {
  return (
    <FormControl sx={{ minWidth: 250 }} size="small">
      <InputLabel htmlFor="grouped-show-select">Select a Show</InputLabel>
      <Select
        defaultValue=""
        id="grouped-show-select"
        label="Select a show"
        autoWidth
        sx={{ color: "#fff" }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <ListSubheader>Merck</ListSubheader>
        <MenuItem value={1}>2022 Merck Technology Symposium</MenuItem>
        <MenuItem value={2}>2022 Merck Imaging Symposium</MenuItem>
        <ListSubheader>Sanofi</ListSubheader>
        <MenuItem value={3}>2022 Sanofi Global Symposium</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectShowOption;
