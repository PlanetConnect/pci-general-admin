import Box from "@mui/material/Box";

import {
  Actions,
  Dropzone,
  Form,
  Select,
  Switch,
  TextArea,
  TextField,
} from "../../app/templates/formbuilder";
import { SaveButton } from "../../app/templates/button";
import { useSnackBar } from "../../app/templates/snackbar";

import formSchema from "./data/form/formSchema";
import formTypes from "./data/form/formTypes";

const form = {
  name: "Merck Technology Symposium 2021 Registration Form",
  type: "abstract_submission",
  isActive: true,
  description: "Testcription",
};

const FormSettings = () => {
  const { openSnackBar } = useSnackBar();
  const handleSubmit = (data: any) => {
    console.log(data);
    openSnackBar({
      message: "Form settting successfully updated.",
      position: {
        vertical: "top",
        horizontal: "center",
      },
      variant: "success",
    });
  };

  return (
    <Box sx={{ flex: 1, maxWidth: 850 }}>
      <Form
        size="xl"
        defaultValues={form}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        <Dropzone />
        <Switch label="Is Active?" name="isActive" isChecked={true} />
        <TextField type="text" label="Name" name="name" />
        <Select label="Type" name="type" options={formTypes} />
        <TextArea type="text" label="Description" name="description" />
        <Actions>
          <SaveButton />
        </Actions>
      </Form>
    </Box>
  );
};

export default FormSettings;
