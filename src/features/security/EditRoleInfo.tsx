import { SaveButton } from "../../app/templates/button";
import { PaperContent } from "../../app/templates/content/";
import {
  Actions,
  Form,
  Header,
  Section,
  Switch,
  TextArea,
  TextField,
} from "../../app/templates/formbuilder";
import { useSnackBar } from "../../app/templates/snackbar";
import roleSchema from "./data/form/roleSchema";

const role = {
  role_id: "81107b52-e46b-4c31-8e6a-4c1e2e46f896",
  name: "Reporting",
  isActive: true,
  description: "A Reporting Role",
  created_time: "2022-03-25 08:16:34.290828",
  modified_time: "2022-03-25 08:16:34.290828",
};

const EditRoleInfo = () => {
  const { openSnackBar } = useSnackBar();
  const handleSubmit = (values: any) => {
    console.log(values);
    openSnackBar({
      message: "Account successfully updated.",
      position: {
        vertical: "top",
        horizontal: "center",
      },
      variant: "success",
    });
  };
  return (
    <PaperContent>
      <Form
        size="md"
        defaultValues={role}
        validationSchema={roleSchema}
        onSubmit={handleSubmit}
      >
        <Header>Edit Role Information</Header>

        <Section name="General information">
          <Switch
            label="Is Active?"
            name="isActive"
            isChecked={role.isActive}
          />
          <TextField type="text" label="Name" name="name" />
          <TextArea type="text" label="Description" name="description" />
        </Section>
        <Actions>
          <SaveButton />
        </Actions>
      </Form>
    </PaperContent>
  );
};

export default EditRoleInfo;
