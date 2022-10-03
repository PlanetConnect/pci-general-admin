import React, { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import {
  Actions,
  Form,
  Switch,
  Select,
  TextArea,
  TextField,
  formSchema,
  formTypes,
} from "../../app/templates/formbuilder";
import { Dialog } from "../../app/templates/dialog";
import {
  CancelButton,
  FabAddButton,
  SaveButton,
} from "../../app/templates/button";

const form = {
  isActive: true,
  name: "",
  type: "registration",
  description: "",
};

const AddForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = (values: any) => {
    console.log(values);
    setIsDialogOpen(false);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Stack alignItems="center">
        <FabAddButton onClick={handleDialogOpen} />
      </Stack>

      <Dialog title="Add new form" isOpen={isDialogOpen}>
        <Form
          size="xl"
          defaultValues={form}
          validationSchema={formSchema}
          onSubmit={handleSubmit}
        >
          <Switch
            label="Is Active?"
            name="isActive"
            isChecked={form.isActive}
          />
          <TextField type="text" label="Name" name="name" />
          <Select label="Type" name="type" options={formTypes} />
          <TextArea type="text" label="Description" name="description" />
          <Actions>
            <CancelButton onClick={handleClose} />
            <SaveButton />
          </Actions>
        </Form>
      </Dialog>
    </Box>
  );
};

export default AddForm;
