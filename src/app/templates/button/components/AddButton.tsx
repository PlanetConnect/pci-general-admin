import React from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";

interface AddButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <IconButton aria-label="delete" color="primary" onClick={onClick}>
      <AddCircleOutlineIcon />
    </IconButton>
  );
};

export default AddButton;
