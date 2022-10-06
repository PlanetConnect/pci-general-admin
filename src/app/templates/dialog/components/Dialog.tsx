import MuiDialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import * as React from "react";

import Transition from "./Transition";

interface DialogProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
}

const Dialog = ({ title, children, isOpen }: DialogProps) => {
  return (
    <MuiDialog TransitionComponent={Transition} open={isOpen} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      <DialogContent>{children}</DialogContent>
    </MuiDialog>
  );
};

export default Dialog;
