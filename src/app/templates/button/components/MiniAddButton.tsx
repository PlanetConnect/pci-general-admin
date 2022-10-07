import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import React from "react";

interface MiniAddButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const MiniAddButton = ({ onClick }: MiniAddButtonProps) => {
  return (
    <IconButton aria-label="add" color="primary" onClick={onClick}>
      <AddCircleOutlineIcon />
    </IconButton>
  );
};

export default MiniAddButton;
