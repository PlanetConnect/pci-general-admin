import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiCheckbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";

import Error from "./Error";

interface CheckboxProps {
  label: string;
  name: string;
  selected: string[] | number[];
  options: string[] | number[];
  isDisabled?: boolean;
  error?: string;
}

const Checkbox = ({
  label,
  name,
  selected,
  options,
  isDisabled = false,
  error,
}: CheckboxProps) => {
  const { control, setValue } = useFormContext();
  const [checkedValues, setCheckedValues] = useState<any[]>(selected);

  function handleSelect(checked: string) {
    const updated = checkedValues?.includes(checked)
      ? checkedValues?.filter((option) => option !== checked)
      : [...(checkedValues ?? []), checked];
    setCheckedValues(updated);
    setValue(name, updated);
    return updated;
  }

  return (
    <Box sx={{ flex: 1 }}>
      <Stack spacing={1}>
        <Controller
          name={name}
          control={control}
          render={() => (
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">{label}</FormLabel>
              <FormGroup>
                {options.map((option: any) => {
                  return (
                    <FormControlLabel
                      key={option}
                      value={option}
                      checked={checkedValues.includes(option)}
                      control={
                        <MuiCheckbox
                          onChange={(e) => {
                            handleSelect(option);
                          }}
                          name={option}
                        />
                      }
                      label={option}
                      disabled={isDisabled}
                    />
                  );
                })}
              </FormGroup>
            </FormControl>
          )}
        />
        <Error name={name} error={error} />
      </Stack>
    </Box>
  );
};

export default Checkbox;
