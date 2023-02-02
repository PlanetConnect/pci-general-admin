import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { Attendee } from "@pci/pci-services.types.attendee";
import { Booth, BoothSchema } from "@pci/pci-services.types.booth";
import { Show } from "@pci/pci-services.types.show";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { SaveButton } from "~/app/templates/button";
import { PaperContent } from "~/app/templates/content/";
import {
  Actions,
  ColorPickerField,
  Form,
  Header,
  MultiSelect,
  Section,
  Select,
  Switch,
  TextArea,
  TextField,
} from "~/app/templates/formbuilder";
import TagsAutoComplete from "~/app/templates/formbuilder/components/TagsAutoComplete";
import { useSnackBar } from "~/app/templates/snackbar";
import { getCurrentShow } from "~/features/auth/authSlice";
import {
  useGetAttendeeByShowQuery,
  useGetBoothByIdQuery,
  useUpdateBoothMutation,
} from "~/services/queryApi";

import exhibitionTypes from "../account/data/form/exhibitionTypes";
import exhibitionSchema from "./data/form/exhibitionSchema";

const EditExhibitionInfo = () => {
  const { openSnackBar } = useSnackBar();
  const navigate = useNavigate();

  const { exhibitionId } = useParams();

  const currentShow = useSelector(getCurrentShow) as Show;

  if (!currentShow) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <ErrorIcon color="error" />
        <Typography>Please select a show first</Typography>
      </div>
    );
  }
  const {
    data: attendeesList,
    isLoading: getAttendeeIsLoading,
    isError: getAttendeeIsError,
  } = useGetAttendeeByShowQuery(currentShow?.show_id as string);
  const [updateBooth, results] = useUpdateBoothMutation();
  const { data, isLoading, isError } = useGetBoothByIdQuery({
    id: exhibitionId as string,
    showId: currentShow?.show_id as string,
  });

  if (isError || getAttendeeIsError) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <ErrorIcon color="error" />
        <Typography>Error Loading Booths</Typography>
      </div>
    );
  }
  if (isLoading || getAttendeeIsLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <CircularProgress />
        <Typography>Loading...</Typography>
      </div>
    );
  }

  const attendees = attendeesList?.data?.map((attendee: Attendee) => {
    return {
      value: attendee,
      label: attendee.contact.first_name + " " + attendee.contact.last_name,
    };
  });

  const exhibition = data?.data as Booth;

  const handleSubmit = async (values: Booth) => {
    console.log(values);
    values.account_id = values.attendees[0].account_id;
    try {
      await updateBooth({
        booth: values,
        showId: currentShow?.show_id as string,
        boothId: exhibitionId as string,
      }).unwrap();
      navigate(`/booths`);
      openSnackBar({
        message: "Booth successfully updated.",
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "success",
      });
    } catch (e: any) {
      console.log(
        "🚀 ~ file: EditExhibitionInfo.tsx:179 ~ handleSubmit ~ e",
        e
      );
      openSnackBar({
        message: `Booth cannot be updated. ${e.error}`,
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "error",
      });
    }
  };
  return (
    <PaperContent>
      <Form
        size="md"
        defaultValues={exhibition}
        validationSchema={BoothSchema}
        onSubmit={handleSubmit}
      >
        <Header>Edit Exhibition Information</Header>

        <Section name="General information">
          <Switch label="Is Active?" name="is_active" isChecked={false} />
          <Switch label="Is Public?" name="is_public" isChecked={false} />
          <Select label="Type" name="type" options={exhibitionTypes} />
          <TextField
            type="text"
            label="Company Name For Event"
            name="display_name"
          />
          <TextField type="text" label="Sponsorship" name="sponsorship" />
          <TextField type="number" label="Design Number" name="design_number" />
          <TextField type="number" label="Booth Number" name="number" />
          <TextField type="text" label="Website URL" name="website" />
          <TextField type="text" label="Logo URL" name="logo_url" />
          <TextArea type="text" label="Description" name="description" />
          <TagsAutoComplete
            label="Tags"
            name="tags"
            options={exhibition.tags}
          />
        </Section>
        <Section name="Attendance">
          <MultiSelect
            label="Attendees"
            name="attendees"
            // selected={attendee.days}
            options={attendees as any[]}
            selected={exhibition?.attendees as any[]}
          />
        </Section>

        <Section name="Colors">
          <Stack direction="row" spacing={2}>
            <ColorPickerField
              label="Primary Color"
              name="color.primary"
              value={"#7B5858"}
            />
            <ColorPickerField
              label="Secondary Color"
              name="color.secondary"
              value={"#2A0F0F"}
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
