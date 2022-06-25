import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";

import Error from "./Error";

interface Option {
  value: string;
  label: string | number;
}

interface MultiSelectProps {
  label: string;
  name: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
  selected: string[] | undefined;
  options: Option[];
  isDisabled?: boolean;
  error?: string;
}

const MultiSelect = ({
  label,
  name,
  variant = "outlined",
  selected = [],
  options,
  error,
}: MultiSelectProps) => {
  const [selectedOptions, setSelectedOptions] = React.useState(selected);
  const [selectOptions] = React.useState(options);
  const { control, setValue } = useFormContext();

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setValue(name, value);
    setSelectedOptions(value);
  };

  const handleDelete = (data: any) => {
    const remaining = selectedOptions.filter(function (option) {
      return option !== data;
    });
    setValue(name, remaining);
    setSelectedOptions(remaining);
  };

  const preview = (selected: string[]) => {
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {selected.map((option: any) => {
          const label = selectOptions.find(({ value }) => value === option);
          return (
            <Chip
              key={option}
              label={label?.label}
              color="primary"
              onDelete={() => handleDelete(option)}
              onMouseDown={(event) => {
                event.stopPropagation();
              }}
            />
          );
        })}
      </Box>
    );
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Stack spacing={1}>
        <Controller
          name={name}
          control={control}
          render={() => (
            <FormControl>
              <InputLabel>{label}</InputLabel>
              <Select
                multiple
                value={selectedOptions}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                renderValue={preview}
                variant={variant}
              >
                {selectOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Error name={name} error={error} />
      </Stack>
    </Box>
  );
};

export default MultiSelect;
