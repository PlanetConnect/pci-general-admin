import Autocomplete from "@mui/lab/Autocomplete";
import { Box, TextField } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useFormContext } from "react-hook-form";

interface MultiSelectProps {
  label: string;
  name: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
  options?: string[];
  isDisabled?: boolean;
  error?: string;
}

const TagsAutoComplete = ({
  label,
  name,
  variant = "outlined",
  options,
  error,
}: MultiSelectProps) => {
  const { control, setValue, watch } = useFormContext();

  return (
    <Autocomplete
      defaultValue={options ? options : []}
      multiple
      id="tags-filled"
      options={[]}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Box key={`tag_${index}`}>
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          </Box>
        ))
      }
      onChange={(event, values) => {
        setValue(name, values);
      }}
      renderInput={(params) => {
        return (
          <TextField
            name={name}
            placeholder={"Type to add"}
            {...params}
            label={label}
            fullWidth
          />
        );
      }}
    />
  );
};

export default TagsAutoComplete;
