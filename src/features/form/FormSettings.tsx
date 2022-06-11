import {
  Form,
  FormBody,
  TextField,
  Select,
  Switch,
  Value,
  FormActions,
  SaveButton,
} from "../../app/templates/form";

import formSchema from "./data/form/formSchema";
import formTypes from "./data/form/formTypes";

const form = {
  name: "Merck Technology Symposium 2021 Registration Form",
  type: "registration",
  isActive: true,
};

const FormSettings = () => {
  const handleSubmit = (values: Value) => {
    console.log(values);
  };
  return (
    <Form
      size="lg"
      initialValues={form}
      onSubmit={handleSubmit}
      validationSchema={formSchema}
    >
      <FormBody>
        <Switch name="isActive" isChecked={form.isActive} label="Is Active?" />
        <TextField type="text" label="Name" name="name" />
        <Select label="Type" name="type" options={formTypes} />
      </FormBody>
      <FormActions>
        <SaveButton />
      </FormActions>
    </Form>
  );
};

export default FormSettings;
