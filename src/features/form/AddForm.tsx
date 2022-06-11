import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

import { FormBody, TextField, Select, Value } from "../../app/templates/form";
import { FormDialog } from "../../app/templates/dialog";

import formSchema from "./data/form/formSchema";
import formTypes from "./data/form/formTypes";

const form = {
  name: "",
  type: "registration",
};

const AddForm = () => {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsFormDialogOpen(true);
  };

  const handleClose = () => {
    setIsFormDialogOpen(false);
  };

  const handleSubmit = (values: Value) => {
    console.log(values);
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
        title="Add new form"
        submitButtonText="Add"
        initialValues={form}
        validationSchema={formSchema}
        isOpen={isFormDialogOpen}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      >
        <FormBody>
          <TextField type="text" label="Form Name" name="name" />
          <Select label="Type" name="type" options={formTypes} />
        </FormBody>
      </FormDialog>
    </React.Fragment>
  );
};

export default AddForm;
