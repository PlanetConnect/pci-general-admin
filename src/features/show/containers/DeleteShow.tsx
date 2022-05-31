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
  const [isAppDialogOpen, setIsAppDialogOpen] = useState(false);
  const { openSnackBar } = useSnackBar();

  const title = "Confirm";
  const message = `Delete ${props.showName}?`;

  const handleDialogOpen = () => {
    setIsAppDialogOpen(true);
  };

  const handleConfirm = () => {
    setIsAppDialogOpen(false);

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
    setIsAppDialogOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton aria-label="edit" size="small" onClick={handleDialogOpen}>
        <DeleteIcon />
      </IconButton>
      <ConfirmationDialog
        title={title}
        children={message}
        isOpen={isAppDialogOpen}
        handleConfirm={handleConfirm}
        handleClose={handleClose}
      ></ConfirmationDialog>
    </React.Fragment>
  );
};

export default DeleteShow;
