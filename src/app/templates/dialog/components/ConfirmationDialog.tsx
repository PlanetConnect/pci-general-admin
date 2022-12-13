import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import React from "react";

import { CancelButton, DeleteButton } from "../../button";
import Transition from "./Transition";

interface ConfirmationDialogProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  handleConfirm: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: (event: React.MouseEvent<HTMLElement>) => void;
}

const ConfirmationDialog = ({
  title,
  children,
  isOpen,
  handleConfirm,
  handleClose,
}: ConfirmationDialogProps) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      open={isOpen}
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={handleClose} />
        <DeleteButton onClick={handleConfirm} />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
