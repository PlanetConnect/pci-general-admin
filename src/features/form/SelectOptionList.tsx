import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import {
  TextField,
  useFieldArrayMethods,
} from "../../app/templates/formbuilder";

import {
  AddButton,
  ButtonGroup,
  DownButton,
  RemoveButton,
  UpButton,
} from "../../app/templates/button";

interface OptionListProps {
  name: string;
  index: number;
}

const SelectOptionList = ({ name, index }: OptionListProps) => {
  const { fields, errors, append, insert, remove, swap } =
    useFieldArrayMethods(name);

  return (
    <Box
      sx={{
        border: 1,
        borderRadius: 2,
        padding: 2,
        borderColor: "grey.500",
      }}
    >
      <Stack spacing={1}>
        {fields.map((field: any, optIndex: number) => {
          return (
            <Stack
              key={field.id}
              spacing={1}
              direction="row"
              alignItems="center"
            >
              <ButtonGroup>
                <DownButton
                  onClick={() => {
                    if (optIndex < fields.length - 1) {
                      swap(optIndex, optIndex + 1);
                    }
                  }}
                />
                <UpButton
                  onClick={() => {
                    if (optIndex !== 0) {
                      swap(optIndex, optIndex - 1);
                    }
                  }}
                />
              </ButtonGroup>
              <TextField
                label="Label"
                name={`${name}.${optIndex}.label`}
                type="text"
                error={
                  errors?.["fields"]?.[index]?.["options"]?.[optIndex]?.[
                    "label"
                  ]?.["message"]
                }
              />
              <TextField
                label="Value"
                name={`${name}.${optIndex}.value`}
                type="text"
                error={
                  errors?.["fields"]?.[index]?.["options"]?.[optIndex]?.[
                    "value"
                  ]?.["message"]
                }
              />
              <ButtonGroup>
                <AddButton
                  onClick={() => insert(optIndex + 1, { label: "", value: "" })}
                />
                <RemoveButton onClick={() => remove(optIndex)} />
              </ButtonGroup>
            </Stack>
          );
        })}
        <Stack alignItems="center">
          <AddButton onClick={() => append({ label: "", value: "" })} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default SelectOptionList;
