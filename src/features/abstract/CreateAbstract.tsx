import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress, Typography } from "@mui/material";
import { Abstract, AbstractSchema } from "@pci/pci-services.types.abstract";
import { Show } from "@pci/pci-services.types.show";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SaveButton } from "~/app/templates/button";
import { PaperContent } from "~/app/templates/content/";
import {
  Actions,
  DateField,
  Form,
  Header,
  MultiSelect,
  Section,
  Select,
  Switch,
  TextField,
} from "~/app/templates/formbuilder";
import AutoComplete from "~/app/templates/formbuilder/components/AutoComplete";
import TagsAutoComplete from "~/app/templates/formbuilder/components/TagsAutoComplete";
import TimeField from "~/app/templates/formbuilder/components/TimeField";
import { useSnackBar } from "~/app/templates/snackbar";
import FieldArray from "~/features/abstract/AbstractFieldArray";
import abstractStatus from "~/features/abstract/data/form/abstractStatus";
import { getUser } from "~/features/auth/userSlice";
import { getCurrentShow } from "~/features/persist/persistSlice";
import {
  useCreateAbstractMutation,
  useGetContactsQuery,
} from "~/services/queryApi";

const CreateAbstract = () => {
  const { openSnackBar } = useSnackBar();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  if (!user) {
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
      <Typography>Please log in again</Typography>
    </div>;
  }
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
  const { data, isLoading, isError } = useGetContactsQuery();
  const [createAabstract, results] = useCreateAbstractMutation();

  if (isError) {
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
        <Typography>Error Fetching Information</Typography>
      </div>
    );
  }
  if (isLoading || data === undefined) {
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

  const defaultValues = new Abstract({
    contacts: [],
    content: "",
    status: "",
    show_id: currentShow?.show_id as string,
    title: "",
  });
  const handleSubmit = async (values: any) => {
    console.log(
      "🚀 ~ file: CreateAbstract.tsx:110 ~ handleSubmit ~ values",
      values
    );
    // values.contacts[0] = {
    //   ...values.contacts[0],
    //   order: 1,
    //   roles: ["Submitter"],
    // };
    // try {
    //   await createAabstract({
    //     abstract: values,
    //     showId: currentShow.show_id as string,
    //   }).unwrap();
    //   navigate(`/abstracts`);

    //   openSnackBar({
    //     message: "Abstract successfully updated.",
    //     position: {
    //       vertical: "top",
    //       horizontal: "center",
    //     },
    //     variant: "success",
    //   });
    // } catch (e: any) {
    //   openSnackBar({
    //     message: `Abstract cannot be created. ${e.error}`,
    //     position: {
    //       vertical: "top",
    //       horizontal: "center",
    //     },
    //     variant: "error",
    //   });
    // }
  };

  return (
    <PaperContent>
      <Form
        size="md"
        defaultValues={defaultValues}
        validationSchema={AbstractSchema}
        onSubmit={handleSubmit}
      >
        <Header>Create Abstract Information</Header>

        <Section name="General Information">
          <Switch label="Is Public?" name="is_public" isChecked={false} />
          <Switch label="Is Live?" name="is_live" isChecked={false} />
          <TextField type="text" label="Title*" name="title" />

          <Select label="Status*" name="status" options={abstractStatus} />
          <TextField type="text" label="Content*" name="content" />

          {/* 
          <AutoComplete
            label="Contact"
            name={`contacts`}
            // selected={attendee.days}
            options={data?.data as any[]}
            selected={undefined}
          /> */}
          <FieldArray fieldArrayName="contacts" />
        </Section>
        <Section name="Schedule">
          <DateField label="Date" name="schedule.date" />
          <TimeField label="Start Time" name="schedule.start_time" />
          <TimeField label="End Time" name="schedule.end_time" />
          <TextField type="text" label="Room" name="schedule.room" />
        </Section>
        <Section name="Other Information">
          <TextField
            type="text"
            label="Area of Science"
            name="area_of_science"
          />
          <TagsAutoComplete label="Keywords" name="keywords" />
          <TextField type="text" label="Note" name="note" />
          <TextField type="text" label="Phase" name="phase" />
          <TextField type="text" label="Sequence Number" name="seq_no" />
          <TextField type="text" label="Source" name="source" />
          <TextField type="text" label="Topic" name="topic" />
        </Section>

        <Section name="Links">
          <TextField
            type="text"
            label="Archive Link"
            name="links.archive_link"
          />
          <TextField
            type="text"
            label="host Presentation Link"
            name="links.host_presentation_link"
          />
          <TextField
            type="text"
            label="Presentation Link"
            name="links.presentation_link"
          />
          <TextField
            type="text"
            label="Presentation PDF"
            name="links.presentation_pdf"
          />
          <TextField
            type="text"
            label="Presentation Video"
            name="links.presentation_video"
          />
        </Section>
        <Actions>
          <SaveButton />
        </Actions>
      </Form>
    </PaperContent>
  );
};

export default CreateAbstract;
