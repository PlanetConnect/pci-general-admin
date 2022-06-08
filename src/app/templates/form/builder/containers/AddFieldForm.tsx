import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

import Form from "../../containers/Form";
import FormBody from "../../containers/FormBody";
import TextField from "../../components/TextField";
import Select from "../../components/Select";

import { FormDialog } from "../../../dialog";

import fieldTypes from "../data/fieldTypes";

const AddFieldForm = () => {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const title = "Add new field";

  const handleDialogOpen = () => {
    setIsFormDialogOpen(true);
  };

  const handleConfirm = () => {
    setIsFormDialogOpen(false);
  };

  const handleClose = () => {
    setIsFormDialogOpen(false);
  };

  return (
    <React.Fragment>
      <Fab
        size="small"
        color="secondary"
        aria-label="add"
        onClick={handleDialogOpen}
      >
        <AddIcon />
      </Fab>

      <FormDialog
        title={title}
        isOpen={isFormDialogOpen}
        handleConfirm={handleConfirm}
        handleClose={handleClose}
      >
        <Form
          size="md"
          initialValues={{}}
          onSubmit={handleConfirm}
          validationSchema={{}}
        >
          <FormBody>
            <TextField type="text" label="Label" name="label" />
            <TextField type="text" label="Field Name" name="name" />
            <Select label="Type" name="type" options={fieldTypes} />
          </FormBody>
        </Form>
      </FormDialog>
    </React.Fragment>
  );
};

export default AddFieldForm;
