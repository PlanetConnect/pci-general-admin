import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { Actions, Form } from "../../app/templates/formbuilder";
import { FabAddButton, SaveButton } from "../../app/templates/button";
import { useSnackBar } from "../../app/templates/snackbar";

import fieldSchema from "./data/form/fieldSchema";
import FieldList from "./FieldList";

const initialValues = {
  fields: [
    {
      fieldId: "29129293291sd1235412",
      type: "textfield",
      label: "First Name",
      name: "first_name",
      isActive: false,
      validations: {
        isRequired: false,
        max: 250,
        type: "string",
      },
    },
    {
      fieldId: "29129293291sd1232211",
      type: "textfield",
      label: "Last Name",
      name: "last_name",
      isActive: false,
      validations: {
        isRequired: false,
        max: 250,
        type: "string",
      },
    },
    {
      fieldId: "29129293291sd1234242s",
      type: "textfield",
      label: "Email",
      name: "email",
      isActive: false,
      validations: {
        isRequired: true,
        max: 250,
        type: "string",
      },
    },
    {
      fieldId: "29129293291sd12342672",
      type: "textfield",
      label: "Division",
      name: "division",
      isActive: true,
      validations: {
        isRequired: false,
        max: 250,
        type: "string",
      },
    },
    {
      fieldId: "29129293291sd1234777",
      type: "select",
      label: "Site",
      name: "site",
      isActive: true,
      validations: {
        isRequired: true,
        max: 250,
        type: "string",
      },
      options: [
        {
          label: "Rahway",
          value: "rahway",
        },
        {
          label: "Whitehouse Station West",
          value: "whitehouse_station_west",
        },
      ],
    },
    {
      fieldId: "29129293291sd12342114",
      type: "select",
      label: "Attendance Days",
      name: "attendance_days",
      isActive: true,
      validations: {
        isRequired: true,
        max: 250,
        type: "string",
      },
      options: [
        {
          label: "Both Physical Days",
          value: "Physical Day 1, Physical Day 2",
        },
        {
          label: "Both Virtual Days",
          value: "Virtual Day 1, Virtual Day 2",
        },
        {
          label: "Virtual Day 1",
          value: "Virtual Day 1",
        },
        {
          label: "Virtual Day 2",
          value: "Virtual Day 2",
        },
        {
          label: "Physical Day 1",
          value: "Physical Day 1",
        },
        {
          label: "Physical Day 2",
          value: "Physical Day 2",
        },
      ],
    },
  ],
};

const FormFields = () => {
  const { openSnackBar } = useSnackBar();

  const handleSubmit = (data: any) => {
    console.log(data);
    openSnackBar({
      message: "Fields successfully updated.",
      position: {
        vertical: "top",
        horizontal: "center",
      },
      variant: "success",
    });
  };

  return (
    <Box sx={{ marginBottom: 1, maxWidth: "100%" }}>
      <Form
        size="lg"
        defaultValues={initialValues}
        validationSchema={fieldSchema}
        onSubmit={handleSubmit}
      >
        <FieldList name="fields" />
        <Stack alignItems="center">
          <FabAddButton onClick={() => console.log("implement me")} />
        </Stack>
        <Actions>
          <SaveButton />
        </Actions>
      </Form>
    </Box>
  );
};
export default FormFields;
