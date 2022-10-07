import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import React from "react";

interface FabAddButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const FabAddButton = ({ onClick }: FabAddButtonProps) => {
  return (
    <Fab size="small" color="secondary" aria-label="add" onClick={onClick}>
      <AddIcon />
    </Fab>
  );
};

export default FabAddButton;
