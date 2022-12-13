import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { ColorPicker } from "../../colorpicker";

interface ColorPickerFieldProps {
  name: string;
  label: string;
  value?: string;
}

const ColorPickerField = ({
  name,
  label,
  value = "#FFF",
}: ColorPickerFieldProps) => {
  const { control, setValue } = useFormContext();

  const handleChange = (color: string) => {
    setValue(name, color);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Stack spacing={1}>
        <Controller
          name={name}
          control={control}
          defaultValue={value}
          render={({ field: { onChange, value } }) => (
            <TextField
              type="text"
              onChange={onChange}
              label={label}
              value={value}
              variant="outlined"
              disabled
            />
          )}
        />
        <ColorPicker onChange={handleChange} value={value} />
      </Stack>
    </Box>
  );
};

export default ColorPickerField;
