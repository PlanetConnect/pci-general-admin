import React, { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { FormBody, TextField, Select, Value } from "../../app/templates/form";
import { FormDialog } from "../../app/templates/dialog";
import { FabAddButton } from "../../app/templates/button";

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
    <Box sx={{ flex: 1 }}>
      <Stack alignItems="center">
        <FabAddButton onClick={handleDialogOpen} />
      </Stack>

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
    </Box>
  );
};

export default AddForm;
