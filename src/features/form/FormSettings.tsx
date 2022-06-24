import Box from "@mui/material/Box";

import {
  Actions,
  Checkbox,
  ColorPickerField,
  FileUpload,
  Form,
  MultiSelect,
  Section,
  Select,
  Switch,
  TextArea,
  TextField,
} from "../../app/templates/formbuilder";
import { SaveButton } from "../../app/templates/button";
import { useSnackBar } from "../../app/templates/snackbar";
import { ImagePreview } from "../../app/templates/uploader";

import formSchema from "./data/form/formSchema";
import formTypes from "./data/form/formTypes";

import Stack from "@mui/material/Stack";

const form = {
  name: "Merck Technology Symposium 2021 Registration Form",
  type: "abstract_submission",
  isActive: true,
  description: "Testcription",
  mainColor: "#587876",
  roles: ["2132412124121232", "124245151223412"],
  attendance: ["Day 1", "Day 2", "Day 3"],
  attachment:
    "https://www.learningcontainer.com/wp-content/uploads/2020/09/Sample-Image-File-for-Testing.png?ezimgfmt=ng%3Awebp%2Fngcb4%2Frs%3Adevice%2Frscb4-1",
};

const accepted = {
  "image/*": [".png", ".jpg", ".jpeg", ".gif"],
};

const roles = [
  {
    label: "Pharma Attendee",
    value: "23233231411223",
  },
  {
    label: "Staff",
    value: "23237777778888",
  },
  {
    label: "Reporting",
    value: "23234352636321",
  },
  {
    label: "Singer",
    value: "12345678909123123",
  },
];

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
        <MultiSelect
          label="Roles"
          name="roles"
          selected={form.roles}
          options={roles}
        />

        <Checkbox
          name="attendance"
          selected={form.attendance}
          options={["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"]}
          label="Attendance Days"
        />
        <Stack spacing={2} direction="row">
          <ColorPickerField
            name="mainColor"
            label="Main Color"
            value={form.mainColor}
          />
          <ColorPickerField
            name="mainColor"
            label="Main Color"
            value={form.mainColor}
          />
        </Stack>

        <Section name="Attachment">
          <ImagePreview width={300} height="100%" url={form.attachment} />
          <FileUpload name="attachment" accepted={accepted} />
        </Section>
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
