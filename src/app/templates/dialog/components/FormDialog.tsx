import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Transition from "./Transition";

import { Form, Value } from "../../form";

interface FormDialogProps {
  title: string;
  submitButtonText: string;
  children: React.ReactNode;
  initialValues: Value;
  validationSchema: object;
  isOpen: boolean;
  handleSubmit: (values: any) => void;
  handleClose: () => void;
}

const FormDialog = (props: FormDialogProps) => {
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
        <Form
          size="md"
          initialValues={props.initialValues}
          onSubmit={props.handleSubmit}
          validationSchema={props.validationSchema}
        >
          {props.children}
          <DialogActions>
            <Button variant="outlined" onClick={props.handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="success">
              {props.submitButtonText}
            </Button>
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
