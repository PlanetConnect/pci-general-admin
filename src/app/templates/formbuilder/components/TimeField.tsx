import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import Error from "./Error";

interface TimeFieldProps {
  label: string;
  name: string;
  inputFormat?: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
  error?: string;
}

const TimeField = ({
  label,
  name,
  inputFormat = "MM/dd/yyyy",
  variant = "outlined",
  error,
}: TimeFieldProps) => {
  const { control } = useFormContext();

  return (
    <Stack spacing={1}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TimePicker
            label={label}
            value={field.value}
            onChange={(value: Date | null) => {
              field.onChange(value && new Date(value));
            }}
            renderInput={(params) => {
              return (
                <TextField
                  variant={variant}
                  {...params}
                  sx={{ width: "100%" }}
                />
              );
            }}
          />
          //   <DesktopDatePicker
          //     label={label}
          //     inputFormat={inputFormat}
          //     value={field.value}
          //     onChange={(value: Date | null) => {
          //       field.onChange(value && new Date(value));
          //     }}
          //     renderInput={(params) => {
          //       return (
          //         <TextField
          //           variant={variant}
          //           {...params}
          //           sx={{ width: "100%" }}
          //         />
          //       );
          //     }}
          //   />
        )}
      />
      <Error name={name} error={error} />
    </Stack>
  );
};

export default TimeField;
