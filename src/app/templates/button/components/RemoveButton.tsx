import React from "react";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";

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
