import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React from "react";

import { SaveButton } from "~/app/templates/button";
import { Actions, Form, formSchema } from "~/app/templates/formbuilder";
import { useSnackBar } from "~/app/templates/snackbar";

import AddField from "./AddField";
import FieldList from "./FieldList";

const initialValues = {
  isActive: true,
  name: "Registration Form",
  type: "registration",
  fields: [
    {
      fieldId: "29129293291sd1235412",
      type: "textfield",
      label: "First Name",
      name: "first_name",
      isActive: true,
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
      isActive: true,
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
      isActive: true,
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
      type: "checkbox",
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
    {
      fieldId: "2912929322222187644",
      type: "multiselect",
      label: "Roles",
      name: "roles",
      isActive: true,
      validations: {
        isRequired: true,
        type: "string",
      },
      options: [
        {
          label: "Role1",
          value: "Role1ID",
        },
        {
          label: "Role2",
          value: "Role2ID",
        },
        {
          label: "Role3",
          value: "Role3ID",
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
        size="xl"
        defaultValues={initialValues}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        <FieldList name="fields" />
        <Stack alignItems="center">
          <AddField />
        </Stack>
        <Actions>
          <SaveButton />
        </Actions>
      </Form>
    </Box>
  );
};
export default FormFields;
