import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Abstract, AbstractSchema } from "@pci/pci-services.types.abstract";
import { Show } from "@pci/pci-services.types.show";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { SaveButton } from "~/app/templates/button";
import { PaperContent } from "~/app/templates/content/";
import {
  Actions,
  Form,
  Header,
  LookupField,
  Section,
  Select,
  Switch,
  TextArea,
  TextField,
} from "~/app/templates/formbuilder";
import AutoComplete from "~/app/templates/formbuilder/components/AutoComplete";
import { useSnackBar } from "~/app/templates/snackbar";
import abstractStatus from "~/features/abstract/data/form/abstractStatus";
import { getCurrentShow } from "~/features/persist/persistSlice";
import {
  useGetAbstractByShowAndIdQuery,
  useGetAttendeeByEmailQuery,
  useGetContactsQuery,
  useUpdateAbstractMutation,
  useUpdateAttendeeMutation,
} from "~/services/queryApi";

import abstractSchema from "./data/form/abstractSchema";

const abstract = {
  abstract_id: "4eeffd69-43da-4e14-a653-d6cee2247ed3",
  status: "Accepted",
  show_id: "5df3b780-ac2e-48b4-9d55-169ab523ac0a",
  show_name: "Test Show",
  account_id: "b0193ac3-f988-464d-bf2e-8accdfba945b",
  account_name: "PlanetConnect Inc.",
  is_public: true,
  accepted_type: "Poster",
  submission_type: {
    stringValues: ["Poster", "Track Talk"],
  },
  seq_no: "422421",
  topic: "Enhancing Monitoring",
  area_of_science: null,
  phase: null,
  track: "Medialine",
  track_number: 1,
  is_live: false,
  keywords: "Test1,Test2,Test3",
  note: "",
  title: "Test Abstract 1",
  content: "Contents of the Test Abstract Goes HERE!",
  links:
    '{"abstract_id":"4eeffd69-43da-4e14-a653-d6cee2247ed3","presentation":"https://planetconnect.com/presentation-1","archive":"https://planetconnect.com/archive-1","video":"https://planetconnect.com/video-1.mp4","pdf":"https://planetconnect.com/pdf-1.pdf","host":"https://planetconnect.com/host-1"}',
  schedule:
    '{"abstract_id":"4eeffd69-43da-4e14-a653-d6cee2247ed3","date":"2022-10-25","start_time":"2022-11-25T12:35:38+00:00","end_time":"2022-11-25T12:35:38+00:00","venue":"Oceanhall"}',
  contacts:
    '[{"abstract_id":"4eeffd69-43da-4e14-a653-d6cee2247ed3","contact_id":"5caa8244-cc26-4725-bf42-91fd7b27cdba","first_name":"Jamesh","last_name":"Vindua","contact_account_id":"b0193ac3-f988-464d-bf2e-8accdfba945b","contact_account_name":"PlanetConnect Inc.","title":"Programmer","department":"Test","site":"Bonham","linked_in_url":"https://www.linkedin.com/in/jamesh-vindua-85aa3380/","expertise_area":"Programming,Testing,Software Development","phone":"7326643146","bio":"Biological test methods describe standardized experiments that determine the toxicity of a substance or material by evaluating its effect on living organisms. Tests are designed to use appropriate organisms and sensitive effect measurements in the media of interest for a specified test duration.","mailing_street":"83 Walnut St.","mailing_city":"Loneham","mailing_zip":"09762","mailing_state":"New Jersey","mailing_country":"United States","roles":["Submitter","Author","Presenter"],"order":1}, {"abstract_id":"4eeffd69-43da-4e14-a653-d6cee2247ed3","contact_id":"9732ae4a-e353-4360-bf81-c4aad20836d0","first_name":"Rich","last_name":"Brandwein","contact_account_id":"b0193ac3-f988-464d-bf2e-8accdfba945b","contact_account_name":"PlanetConnect Inc.","title":"Development Lead","department":"Management","site":"Jersey","linked_in_url":null,"expertise_area":"Programming,Testing,Software Development,Management,Leadership","phone":"6653321244","bio":"Developer, Tester, and Executive","mailing_street":null,"mailing_city":null,"mailing_zip":null,"mailing_state":null,"mailing_country":null,"roles":["Presenter","Author"],"order":2}]',
  likes: 0,
  votes: 1,
  created_time: "2022-03-29T14:32:56.619Z",
  modified_time: "2022-03-29T14:32:56.619Z",
};

const EditAbstractInfo = () => {
  const { openSnackBar } = useSnackBar();
  const navigate = useNavigate();

  const { abstractId } = useParams();

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

  const [updateAbstract, results] = useUpdateAbstractMutation();
  const { data, isLoading, isError } = useGetAbstractByShowAndIdQuery({
    abstractId: abstractId as string,
    showId: currentShow?.show_id as string,
  });

  const {
    data: contacts,
    isLoading: getContactsIsLoading,
    isError: getContactsIsError,
  } = useGetContactsQuery();

  if (isError || getContactsIsError) {
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
  if (isLoading || getContactsIsLoading || data === undefined) {
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

  const abstract = data.data as Abstract;

  const handleSubmit = async (values: any) => {
    console.log(
      "🚀 ~ file: EditAbstractInfo.tsx:143 ~ handleSubmit ~ values",
      values
    );
    try {
      await updateAbstract({
        abstract: values,
        showId: currentShow?.show_id as string,
        abstractId: abstractId as string,
      }).unwrap();
      navigate(`/abstracts`);
      openSnackBar({
        message: "Abstract successfully updated.",
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "success",
      });
    } catch (e: any) {
      openSnackBar({
        message: `Abstract cannot be updated. ${e.error}`,
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
        defaultValues={abstract}
        validationSchema={AbstractSchema}
        onSubmit={handleSubmit}
      >
        <Header>Edit Abstract Information</Header>

        <Section name="General information">
          <TextField type="text" label="Title" name="title" />
          <Select label="Status" name="status" options={abstractStatus} />
          <TextField type="text" label="Content" name="content" />

          <AutoComplete
            label="Contact"
            name="contacts[0].contact"
            // selected={attendee.days}
            options={contacts?.data as any[]}
            selected={undefined}
          />
        </Section>
        <Actions>
          <SaveButton />
        </Actions>
      </Form>
    </PaperContent>
  );
};

export default EditAbstractInfo;
