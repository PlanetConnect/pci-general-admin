import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Show } from "@pci/pci-services.types.show";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { ConfirmationDialog } from "~/app/templates/dialog";
import { useSnackBar } from "~/app/templates/snackbar";
import { getCurrentShow } from "~/features/persist/persistSlice";
import { useDeleteAttendeeMutation } from "~/services/queryApi";

interface DeleteAttendeeProps {
  email: string;
}

const DeleteAttendee = (props: DeleteAttendeeProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { openSnackBar } = useSnackBar();

  const [deletShow, results] = useDeleteAttendeeMutation();
  const title = "Confirm";
  const message = `Delete ${props.email}?`;
  const currentShow = useSelector(getCurrentShow) as Show;

  const handleDialogOpen = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirm = async () => {
    try {
      await deletShow({
        email: props.email,
        showId: currentShow?.show_id || "",
      });

      openSnackBar({
        message: "Show successfully deleted.",
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "success",
      });
      setIsConfirmDialogOpen(false);
    } catch (e: any) {
      openSnackBar({
        message: `Show cannot be deleted. ${e.data.error}`,
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "error",
      });
    }
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
        isOpen={isConfirmDialogOpen}
        handleConfirm={handleConfirm}
        handleClose={handleClose}
      >
        {message}
      </ConfirmationDialog>
    </React.Fragment>
  );
};

export default DeleteAttendee;
