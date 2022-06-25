import React from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";

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
