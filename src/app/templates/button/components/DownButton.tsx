import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import IconButton from "@mui/material/IconButton";
import React from "react";

interface DownButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const DownButton = ({ onClick }: DownButtonProps) => {
  return (
    <IconButton aria-label="delete" color="primary" onClick={onClick}>
      <ArrowCircleDownIcon />
    </IconButton>
  );
};

export default DownButton;
