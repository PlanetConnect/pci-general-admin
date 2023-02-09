import ErrorIcon from "@mui/icons-material/Error";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Abstract, AbstractSchema } from "@pci/pci-services.types.abstract";
import { Contact } from "@pci/pci-services.types.contact";
import { Show } from "@pci/pci-services.types.show";
import {
  Control,
  Controller,
  FieldValues,
  useFieldArray,
  UseFieldArrayUpdate,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SaveButton } from "~/app/templates/button";
import { PaperContent } from "~/app/templates/content/";
import {
  Actions,
  Form,
  Header,
  MultiSelect,
  Section,
  Select,
  TextField,
} from "~/app/templates/formbuilder";
import AutoComplete from "~/app/templates/formbuilder/components/AutoComplete";
import { useSnackBar } from "~/app/templates/snackbar";
import abstractRoles from "~/features/abstract/data/form/abstractRoles";
import { getUser } from "~/features/auth/userSlice";
import { getCurrentShow } from "~/features/persist/persistSlice";
import {
  useCreateAbstractMutation,
  useGetContactsQuery,
} from "~/services/queryApi";

interface FieldArrayProps {
  fieldArrayName: string;
}

const FieldArray = ({ fieldArrayName }: FieldArrayProps) => {
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

  const { control, register, watch, setValue } = useFormContext();
  const values = watch();
  console.log(
    "🚀 ~ file: AbstractFieldArray.tsx:195 ~ FieldArray ~ values",
    values
  );
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: fieldArrayName,
  });

  const handleSelectContactSubmit = async (values: any, name: string) => {
    console.log(
      "🚀 ~ file: AbstractFieldArray.tsx:209 ~ FieldArray ~ name",
      name
    );
    console.log(
      "🚀 ~ file: AbstractFieldArray.tsx:109 ~ handleSubmit ~ values",
      values
    );
    if (values?.address?.facility) {
      const newValue = values;
      delete newValue.address.facility;
    }

    setValue(name, values as Contact);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Stack spacing={1}>
        <Section name="Contacts*">
          {fields?.map((item, index) => (
            <fieldset key={item.id}>
              <AutoComplete
                label="Contact"
                name={`${fieldArrayName}[${index}].contact`}
                // selected={attendee.days}
                options={data?.data as any[]}
                selected={undefined}
                // manualOnChange={(values: Contact | null) => {
                //   handleSelectContactSubmit(
                //     values,
                //     `${fieldArrayName}[${index}].contact`
                //   );
                // }}
              />
              <MultiSelect
                label="Roles"
                name={`${fieldArrayName}[${index}].roles`}
                options={abstractRoles}
                selected={undefined}
              />
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </fieldset>
          ))}
          <Button onClick={() => append({ contact: [], roles: ["speaker"] })}>
            Add Contact
          </Button>
        </Section>
      </Stack>
    </Box>
  );
};

export default FieldArray;
