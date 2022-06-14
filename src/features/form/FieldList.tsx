import React from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Accordion } from "../../app/templates/accordion";
import { FormBody, TextField, Select, Switch } from "../../app/templates/form";

import Field from "./data/types/Field";
import fieldTypes from "./data/form/fieldTypes";

const FieldList = ({ form }: any) => {
  return (
    <Box sx={{ marginBottom: 1 }}>
      {form.values.fields.map((field: Field, index: number) => {
        return (
          <Accordion
            key={field.fieldId}
            summary={
              <Stack spacing={1} direction="row" alignItems="center">
                <Chip
                  label={field.isActive ? "Active" : "Inactive"}
                  color={field.isActive ? "success" : "error"}
                />
                <Typography sx={{ fontWeight: 800 }}>{field.label}</Typography>
              </Stack>
            }
          >
            <FormBody>
              <Switch
                label="Is Active?"
                name={`fields.${index}.isActive`}
                isChecked={field.isActive}
              />
              <Select
                label="Type"
                name={`fields.${index}.type`}
                options={fieldTypes}
                isDisabled
              />
              <TextField
                label="Label"
                name={`fields.${index}.label`}
                type="text"
              />
              <TextField
                label="Name"
                name={`fields.${index}.name`}
                type="text"
                isDisabled
              />
            </FormBody>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default FieldList;
