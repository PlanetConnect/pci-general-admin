import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";

interface Option {
  value: string;
  label: string | number;
}

interface MultiSelectProps {
  label: string;
  name: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
  selected: string[] | number[];
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
  isDisabled = false,
  error,
}: MultiSelectProps) => {
  const [selectedOptions, setSelectedOptions] = React.useState(selected); // ids of the role selected
  const [selectOptions, setSelectOptions] = React.useState<Option[]>(options); //available options

  console.log(options);
  //   const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  //     const {
  //       target: { value },
  //     } = event;
  //     setPersonName(typeof value === "string" ? value.split(",") : value);
  //   };

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    console.log(value);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Stack spacing={2}>
        <FormControl>
          <InputLabel>Roles</InputLabel>
          <Select
            multiple
            value={selectedOptions}
            onChange={handleChange}
            input={<OutlinedInput label="Roles" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((option) => (
                  <Chip key={option} label={option} />
                ))}
              </Box>
            )}
          >
            {selectOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default MultiSelect;
