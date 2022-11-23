import Box from "@mui/material/Box";

import { SaveButton } from "~/app/templates/button";
import { Actions, Field, Form, Header } from "~/app/templates/formbuilder";

import configData from "./data/config/configData";
import configForm from "./data/config/configForm";
import showSchema from "./data/form/showSchema";

const EditShowConfig = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      size="xl"
      defaultValues={configData.config}
      onSubmit={handleSubmit}
      validationSchema={showSchema}
    >
      <Header>Edit Show Config Properties</Header>
      {configForm.fields.map((field) => {
        return (
          <Box key={field.name}>
            <Field field={field} />
          </Box>
        );
      })}
      <Actions>
        <SaveButton />
      </Actions>
    </Form>
  );
};

export default EditShowConfig;
