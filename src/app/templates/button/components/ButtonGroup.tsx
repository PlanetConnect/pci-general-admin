import MuiButtonGroup from "@mui/material/ButtonGroup";
import React from "react";

interface ButtonGroupProps {
  children: React.ReactNode;
}

const ButtonGroup = ({ children }: ButtonGroupProps) => {
  return <MuiButtonGroup>{children}</MuiButtonGroup>;
};

export default ButtonGroup;
