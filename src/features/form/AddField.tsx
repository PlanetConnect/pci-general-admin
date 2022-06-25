import React, { useState } from "react";
import { snakeCase } from "snake-case";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import {
  Actions,
  Form,
  Switch,
  Select,
  TextField,
} from "../../app/templates/formbuilder";

import { Dialog } from "../../app/templates/dialog";
import {
  CancelButton,
  FabAddButton,
  AddButton,
} from "../../app/templates/button";

import fieldSchema from "./data/form/fieldSchema";
import fieldTypes from "./data/form/fieldTypes";

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
          <TextField
            type="text"
            label="Label"
            name="label"
            onChange={(text) => setName(text)}
          />
          <TextField
            type="text"
            label="Name"
            name="name"
            isDisabled={true}
            value={snakeCase(name)}
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
