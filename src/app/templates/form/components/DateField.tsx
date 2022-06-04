import { useState } from "react";

import { useField, FieldHookConfig } from "formik";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { Alert } from "../../alert";

interface DateFieldProps {
  dateValue: string;
  label: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
}

const DateField = ({
  dateValue,
  label,
  variant = "outlined",
  ...props
}: DateFieldProps & FieldHookConfig<string>) => {
  const [value, setValue] = useState<Date | null>(new Date(dateValue));
  const [field, meta, helpers] = useField(props);

  const handleChange = (newValue: Date | null) => {
    if (newValue) {
      setValue(newValue);
      helpers.setValue(newValue.toLocaleString());
    }
  };

  return (
    <Stack spacing={1}>
      <DesktopDatePicker
        label={label}
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={handleChange}
        renderInput={(params) => {
          return (
            <TextField
              variant={variant}
              {...params}
              {...field}
              size="small"
              sx={{ width: "100%" }}
            />
          );
        }}
      />
      {meta.touched && meta.error ? (
        <Alert severity="error">{meta.touched && meta.error}</Alert>
      ) : null}
    </Stack>
  );
};

export default DateField;
