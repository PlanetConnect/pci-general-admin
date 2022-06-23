import { useField, FieldHookConfig } from "formik";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect from "@mui/material/Select";
import Stack from "@mui/material/Stack";

import { Alert } from "../../alert";

interface Option {
  value: string;
  label: string | number;
}

interface SelectProps {
  label: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
  options: Option[];
  isDisabled?: boolean;
}

const Select = ({
  label,
  variant = "outlined",
  options,
  isDisabled = false,
  ...props
}: SelectProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  return (
    <Stack sx={{ width: "100%" }} spacing={1}>
      <FormControl variant={variant}>
        <InputLabel id={label}>{label}</InputLabel>
        <MuiSelect
          {...field}
          labelId={label}
          label={label}
          disabled={isDisabled}
        >
          {options.map((option: Option) => {
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
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
