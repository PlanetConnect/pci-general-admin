import React from "react";
import MuiButtonGroup from "@mui/material/ButtonGroup";

interface ButtonGroupProps {
  children: React.ReactNode;
}

const ButtonGroup = ({ children }: ButtonGroupProps) => {
  return <MuiButtonGroup>{children}</MuiButtonGroup>;
};

export default ButtonGroup;
