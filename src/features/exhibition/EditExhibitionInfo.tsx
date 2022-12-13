import Stack from "@mui/material/Stack";

import { SaveButton } from "~/app/templates/button";
import { PaperContent } from "~/app/templates/content/";
import {
  Actions,
  ColorPickerField,
  Form,
  Header,
  Section,
  Select,
  Switch,
  TextArea,
  TextField,
} from "~/app/templates/formbuilder";
import { useSnackBar } from "~/app/templates/snackbar";

import exhibitionTypes from "../account/data/form/exhibitionTypes";
import exhibitionSchema from "./data/form/exhibitionSchema";

const exhibition = {
  exhibitionId: "4aa97f1c-6a9c-499c-8e2a-899514fff242",
  showId: "5df3b780-ac2e-48b4-9d55-169ab523ac0a",
  accountId: "b0193ac3-f988-464d-bf2e-8accdfba945b",
  type: "External",
  designNumber: 2,
  isActive: true,
  isPublic: true,
  number: 34,
  displayName: "PlanetConnect Inc.",
  websiteUrl: "https://planetconnect.com",
  logoUrl: "https://planetconnect.com/images/planet.png",
  primaryColor: "#7B5858",
  secondaryColor: "#2A0F0F",
  description: "We organize events for you.",
  tags: "events,planning,demystification,software engineering",
  sponsorship: "Booth",
  virtualStaffLimit: 5,
  onsiteStaffLimit: 5,
  productShowcaseLimit: 5,
  meetingRoomClientLink: "https://planetconnect.com/letsgo",
  meetingRoomHostLink: "https://planetconnect.com/hosts",
  meetingRoomNumber: "42",
  createdTime: "2022-03-28 06:01:20.656392",
  modifiedTime: "2022-03-28 06:01:20.656392",
};

const EditExhibitionInfo = () => {
  const { openSnackBar } = useSnackBar();
  const handleSubmit = (values: any) => {
    console.log(values);
    openSnackBar({
      message: "Exhibition successfully updated.",
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
        defaultValues={exhibition}
        validationSchema={exhibitionSchema}
        onSubmit={handleSubmit}
      >
        <Header>Edit Exhibition Information</Header>

        <Section name="General information">
          <Switch
            label="Is Active?"
            name="isActive"
            isChecked={exhibition.isActive}
          />
          <Switch
            label="Is Public?"
            name="isPublic"
            isChecked={exhibition.isPublic}
          />
          <Select label="Type" name="type" options={exhibitionTypes} />
          <TextField
            type="text"
            label="Company Name For Event"
            name="displayName"
          />
          <TextField type="text" label="Sponsorship" name="sponsorship" />
          <TextField type="number" label="Design Number" name="designNumber" />
          <TextField type="number" label="Booth Number" name="number" />
          <TextField type="text" label="Website URL" name="websiteUrl" />
          <TextField type="text" label="Logo URL" name="logoUrl" />
          <TextArea type="text" label="Description" name="description" />
        </Section>

        <Section name="Colors">
          <Stack direction="row" spacing={2}>
            <ColorPickerField
              label="Primary Color"
              name="primaryColor"
              value={exhibition.primaryColor}
            />
            <ColorPickerField
              label="Secondary Color"
              name="SecondaryColor"
              value={exhibition.secondaryColor}
            />
          </Stack>
        </Section>

        <Section name="Limits">
          <Stack direction="row" spacing={2}>
            <TextField
              type="number"
              label="Virtual Staff"
              name="virtualStaffLimit"
            />
            <TextField
              type="number"
              label="Onsite Staff"
              name="onsiteStaffLimit"
            />
          </Stack>
          <TextField
            type="number"
            label="Product Showcase"
            name="productShowcaseLimit"
          />
        </Section>

        <Section name="Links">
          <TextField
            type="text"
            label="Meeting Room Client Link"
            name="meetingRoomClientLink"
          />
          <TextField
            type="text"
            label="Meeting Room Host Link"
            name="meetingRoomHostLink"
          />
          <TextField
            type="number"
            label="Meeting Room Number"
            name="meetingRoomNumber"
          />
        </Section>

        <Actions>
          <SaveButton />
        </Actions>
      </Form>
    </PaperContent>
  );
};

export default EditExhibitionInfo;
