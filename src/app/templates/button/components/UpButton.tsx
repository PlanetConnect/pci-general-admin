import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import IconButton from "@mui/material/IconButton";
import React from "react";

interface UpButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const UpButton = ({ onClick }: UpButtonProps) => {
  return (
    <IconButton aria-label="delete" color="primary" onClick={onClick}>
      <ArrowCircleUpIcon />
    </IconButton>
  );
};

export default UpButton;
