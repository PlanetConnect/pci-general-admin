import React from "react";

import Box from "@mui/material/Box";

import {
  FieldArray,
  Form,
  Value,
  FormActions,
  SaveButton,
} from "../../app/templates/form";

import fieldSchema from "./data/form/fieldSchema";
import FieldList from "./FieldList";

const initialValues = {
  fields: [
    {
      fieldId: "29129293291sd1235412",
      type: "textfield",
      label: "First Name",
      name: "firstName",
      isActive: false,
      validations: {
        isRequired: true,
        max: 250,
        type: "string",
      },
    },
    {
      fieldId: "29129293291sd1232211",
      type: "textfield",
      label: "Last Name",
      name: "lastName",
      isActive: true,
      validations: {
        isRequired: true,
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
  ],
};

const FormFields = () => {
  const handleSubmit = (values: Value) => {
    console.log(values);
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Form
        size="xl"
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={fieldSchema}
        validateOnChange={false}
      >
        <FieldArray name="fields" component={FieldList} />
        <FormActions>
          <SaveButton />
        </FormActions>
      </Form>
    </Box>
  );
};
export default FormFields;
