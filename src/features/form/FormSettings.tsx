import Box from "@mui/material/Box";

import { SaveButton } from "~/app/templates/button";
import {
  Actions,
  Form,
  formSchema,
  formTypes,
  Select,
  Switch,
  TextArea,
  TextField,
} from "~/app/templates/formbuilder";
import { useSnackBar } from "~/app/templates/snackbar";

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
      message: "Form setting successfully updated.",
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
