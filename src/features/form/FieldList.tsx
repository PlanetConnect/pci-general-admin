import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

import { Accordion } from "../../app/templates/accordion";
import {
  ButtonGroup,
  DeleteButton,
  DownButton,
  UpButton,
} from "../../app/templates/button";
import { ConfirmationDialog } from "../../app/templates/dialog";
import {
  Actions,
  fieldTypes,
  Section,
  Select,
  Switch,
  TextField,
  useFieldArrayMethods,
} from "../../app/templates/formbuilder";
import SelectOptionList from "./SelectOptionList";

interface FieldListProps {
  name: string;
}

const FieldList = ({ name }: FieldListProps) => {
  const { fields, errors, swap, remove } = useFieldArrayMethods(name);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState<
    number | undefined
  >(undefined);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleDialogOpen = (index: number) => {
    setSelectedFieldIndex(index);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirm = () => {
    remove(selectedFieldIndex);
    setIsConfirmDialogOpen(false);
    setSelectedFieldIndex(undefined);
  };

  const handleClose = () => {
    setIsConfirmDialogOpen(false);
    setSelectedFieldIndex(undefined);
  };

  const nameError: any = errors?.[name];

  return (
    <Box sx={{ flex: 1 }}>
      {fields.map((field: any, index: number) => {
        return (
          <Accordion
            key={field.id}
            summary={
              <Stack spacing={1} direction="row" alignItems="center">
                <ButtonGroup>
                  <DownButton
                    onClick={(e) => {
                      if (index < fields.length - 1) {
                        swap(index, index + 1);
                      }
                      e.stopPropagation();
                    }}
                  />
                  <UpButton
                    onClick={(e) => {
                      if (index !== 0) {
                        swap(index, index - 1);
                      }
                      e.stopPropagation();
                    }}
                  />
                </ButtonGroup>
                <Chip
                  label={field.isActive ? "Active" : "Inactive"}
                  color={field.isActive ? "success" : "error"}
                />
                <Typography sx={{ fontWeight: 800 }}>{field.label}</Typography>
              </Stack>
            }
          >
            <Section name="">
              <Switch
                label="Is Active?"
                name={`${name}.${index}.isActive`}
                isChecked={field.isActive}
              />
              <Switch
                label="Is Required?"
                name={`${name}.${index}.validations.isRequired`}
                isChecked={field.validations.isRequired}
              />
              <Select
                label="Type"
                name={`${name}.${index}.type`}
                options={fieldTypes}
                isDisabled
              />
              <TextField
                label="Label"
                name={`${name}.${index}.label`}
                type="text"
                error={nameError?.[index]?.["label"]?.["message"]}
              />
              <TextField
                label="Name"
                name={`${name}.${index}.name`}
                type="text"
                isDisabled
              />
              {(field.type === "select" ||
                field.type === "checkbox" ||
                field.type === "multiselect") &&
                field.options && (
                  <Section name="Options">
                    <SelectOptionList
                      name={`${name}.${index}.options`}
                      index={index}
                    />
                  </Section>
                )}
            </Section>
            <Actions>
              <DeleteButton
                onClick={(e) => {
                  handleDialogOpen(index);
                  e.preventDefault();
                }}
              />
            </Actions>
          </Accordion>
        );
      })}
      <ConfirmationDialog
        title="Confirm"
        isOpen={isConfirmDialogOpen}
        handleConfirm={(e) => {
          handleConfirm();
          e.preventDefault();
        }}
        handleClose={handleClose}
      >
        Delete field?
      </ConfirmationDialog>
    </Box>
  );
};

export default FieldList;
