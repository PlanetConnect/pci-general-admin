import {
  Form,
  FormBody,
  TextField,
  Select,
  Switch,
  Value,
  FormActions,
  SaveButton,
  TextArea,
} from "../../app/templates/form";

import formSchema from "./data/form/formSchema";
import formTypes from "./data/form/formTypes";

const form = {
  name: "Merck Technology Symposium 2021 Registration Form",
  type: "registration",
  isActive: true,
  description: "Testcription",
};

const FormSettings = () => {
  const handleSubmit = (values: Value) => {
    console.log(values);
  };
  return (
    <Form
      size="xl"
      initialValues={form}
      onSubmit={handleSubmit}
      validationSchema={formSchema}
    >
      <FormBody>
        <Switch name="isActive" isChecked={form.isActive} label="Is Active?" />
        <TextField type="text" label="Name" name="name" />
        <Select label="Type" name="type" options={formTypes} />
        <TextArea type="text" label="Description" name="description" />
      </FormBody>
      <FormActions>
        <SaveButton />
      </FormActions>
    </Form>
  );
};

export default FormSettings;
