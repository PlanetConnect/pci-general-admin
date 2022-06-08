import { useField, FieldHookConfig } from "formik";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect from "@mui/material/Select";
import Stack from "@mui/material/Stack";

import { Alert } from "../../alert";

interface Option {
  value: string;
  option: string;
}

interface SelectProps {
  label: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
  options: Option[];
}

const Select = ({
  label,
  variant = "outlined",
  options,
  ...props
}: SelectProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  return (
    <Stack sx={{}} spacing={1}>
      <FormControl variant={variant}>
        <InputLabel id={label}>{label}</InputLabel>
        <MuiSelect {...field} labelId={label} label={label}>
          <MenuItem value="">None</MenuItem>
          {options.map((option: Option) => {
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.option}
              </MenuItem>
            );
          })}
        </MuiSelect>
      </FormControl>
      {meta.touched && meta.error ? (
        <Alert severity="error">{meta.touched && meta.error}</Alert>
      ) : null}
    </Stack>
  );
};

export default Select;
