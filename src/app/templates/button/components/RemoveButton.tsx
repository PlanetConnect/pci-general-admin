import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";
import React from "react";

interface RemoveButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const RemoveButton = ({ onClick }: RemoveButtonProps) => {
  return (
    <IconButton aria-label="delete" color="primary" onClick={onClick}>
      <RemoveCircleOutlineIcon />
    </IconButton>
  );
};

export default RemoveButton;
