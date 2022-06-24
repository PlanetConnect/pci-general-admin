import React, { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import Box from "@mui/material/Box";

import "./style.css";

interface ColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
}

const ColorPicker = ({ value = "#FFF", onChange }: ColorPickerProps) => {
  const [color, setColor] = useState(value);

  const handleChange = (color: any) => {
    setColor(color);
    onChange(color);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <HexColorPicker
        className="color-picker"
        color={color}
        onChange={handleChange}
      />
      <HexColorInput
        className="color-picker-input"
        color={color}
        onChange={handleChange}
      />
    </Box>
  );
};

export default ColorPicker;
