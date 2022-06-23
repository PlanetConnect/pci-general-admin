import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Transition from "./Transition";

interface ConfirmationDialogProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  handleConfirm: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: (event: React.MouseEvent<HTMLElement>) => void;
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      open={props.isOpen}
      onClose={props.handleClose}
      fullWidth
    >
      <DialogTitle>{props.title}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>{props.children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={props.handleConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
