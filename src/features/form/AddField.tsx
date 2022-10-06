import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import { snakeCase } from "snake-case";

import { AddButton, CancelButton, FabAddButton } from "~/app/templates/button";
import { Dialog } from "~/app/templates/dialog";
import {
  Actions,
  fieldSchema,
  fieldTypes,
  Form,
  Select,
  Switch,
  TextField,
} from "~/app/templates/formbuilder";

const field = {
  name: "",
  type: "",
  label: "",
  isActive: true,
  options: [],
  validations: {
    isRequired: true,
  },
};

const AddField = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setName("");
    setIsDialogOpen(false);
  };

  const handleSubmit = (values: any) => {
    console.log(values);
    setName("");
    setIsDialogOpen(false);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Stack alignItems="center">
        <FabAddButton onClick={handleDialogOpen} />
      </Stack>

      <Dialog title="Add new field" isOpen={isDialogOpen}>
        <Form
          size="xl"
          defaultValues={field}
          validationSchema={fieldSchema}
          onSubmit={handleSubmit}
        >
          <Switch
            label="Is Active?"
            name="isActive"
            isChecked={field.isActive}
          />
          <Switch
            label="Is Required?"
            name="isRequired"
            isChecked={field.validations.isRequired}
          />
          <TextField type="text" label="Label" name="label" />
          <TextField
            type="text"
            label="Name"
            name="name"
            value={name}
            onChange={(text) => setName(snakeCase(text))}
          />
          <Select label="Type" name="type" options={fieldTypes} />

          <Actions>
            <CancelButton onClick={handleClose} />
            <AddButton />
          </Actions>
        </Form>
      </Dialog>
    </Box>
  );
};

export default AddField;
