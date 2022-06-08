import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { ConfirmationDialog } from "../../../app/templates/dialog";
import { useSnackBar } from "../../../app/templates/snackbar";

interface DeleteShowProps {
  showId: string;
  showName: string;
}

const DeleteShow = (props: DeleteShowProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { openSnackBar } = useSnackBar();

  const title = "Confirm";
  const message = `Delete ${props.showName}?`;

  const handleDialogOpen = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirm = () => {
    setIsConfirmDialogOpen(false);

    openSnackBar({
      message: "Show successfully deleted.",
      position: {
        vertical: "top",
        horizontal: "center",
      },
      variant: "success",
    });
  };

  const handleClose = () => {
    setIsConfirmDialogOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton aria-label="edit" size="small" onClick={handleDialogOpen}>
        <DeleteIcon />
      </IconButton>
      <ConfirmationDialog
        title={title}
        children={message}
        isOpen={isConfirmDialogOpen}
        handleConfirm={handleConfirm}
        handleClose={handleClose}
      ></ConfirmationDialog>
    </React.Fragment>
  );
};

export default DeleteShow;
