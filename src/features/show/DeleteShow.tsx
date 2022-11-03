import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";

import { ConfirmationDialog } from "~/app/templates/dialog";
import { useSnackBar } from "~/app/templates/snackbar";
import { useDeleteShowMutation } from "~/services/queryApi";

interface DeleteShowProps {
  showId: string;
  showName: string;
}

const DeleteShow = (props: DeleteShowProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { openSnackBar } = useSnackBar();

  const [deletShow, results] = useDeleteShowMutation();
  const title = "Confirm";
  const message = `Delete ${props.showName}?`;

  const handleDialogOpen = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const deleteResult = await deletShow(props.showId);

      if (deleteResult?.error) {
        openSnackBar({
          message: `Show cannot be deleted. ${deleteResult.error.error}`,
          position: {
            vertical: "top",
            horizontal: "center",
          },
          variant: "error",
        });
      } else {
        openSnackBar({
          message: "Show successfully deleted.",
          position: {
            vertical: "top",
            horizontal: "center",
          },
          variant: "success",
        });
        setIsConfirmDialogOpen(false);
      }
    } catch (e) {
      console.log("🚀 ~ file: DeleteShow.tsx ~ line 28 ~ handleConfirm ~ e", e);
    }

    // openSnackBar({
    //   message: "Show successfully deleted.",
    //   position: {
    //     vertical: "top",
    //     horizontal: "center",
    //   },
    //   variant: "success",
    // });
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

export default DeleteShow;
