import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";

import { ConfirmationDialog } from "~/app/templates/dialog";
import { useSnackBar } from "~/app/templates/snackbar";
import { useDeleteAccountMutation } from "~/services/queryApi";

interface DeleteAccountProps {
  accountId: string;
  accountName: string;
}

const DeleteAccount = (props: DeleteAccountProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { openSnackBar } = useSnackBar();

  const [deletAccount, results] = useDeleteAccountMutation();
  const title = "Confirm";
  const message = `Delete ${props.accountName}?`;

  const handleDialogOpen = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirm = async () => {
    try {
      await deletAccount(props.accountId);

      openSnackBar({
        message: "Account successfully deleted.",
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "success",
      });
      setIsConfirmDialogOpen(false);
    } catch (e: any) {
      openSnackBar({
        message: `Account cannot be deleted. ${e.data.error}`,
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

export default DeleteAccount;
