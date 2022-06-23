import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect from "@mui/material/Select";
import Stack from "@mui/material/Stack";

import Error from "./Error";

interface Option {
  value: string;
  label: string | number;
}

interface SelectProps {
  label: string;
  name: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
  options: Option[];
  isDisabled?: boolean;
  error?: string;
}

const Select = ({
  label,
  name,
  variant = "outlined",
  options,
  isDisabled = false,
  error,
}: SelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value } }) => (
        <Stack sx={{ width: "100%" }} spacing={1}>
          <FormControl variant={variant}>
            <InputLabel id={label}>{label}</InputLabel>
            <MuiSelect
              value={value}
              onChange={onChange}
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
          <Error name={name} error={error} />
        </Stack>
      )}
    />
  );
};

export default Select;
