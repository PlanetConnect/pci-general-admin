import ErrorIcon from "@mui/icons-material/Error";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

import { MultiSelect, Section } from "~/app/templates/formbuilder";
import AutoComplete from "~/app/templates/formbuilder/components/AutoComplete";
import abstractRoles from "~/features/abstract/data/form/abstractRoles";
import { useGetContactsQuery } from "~/services/queryApi";

interface FieldArrayProps {
  fieldArrayName: string;
}

const FieldArray = ({ fieldArrayName }: FieldArrayProps) => {
  const { data, isLoading, isError } = useGetContactsQuery();

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

  const {
    control,
    formState: { errors },
  } = useFormContext();

  console.log(
    "🚀 ~ file: AbstractFieldArray.tsx:124 ~ FieldArray ~ errors",
    errors
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldArrayName,
  });

  return (
    <Box sx={{ flex: 1 }}>
      <Stack spacing={1}>
        <Section name="Contacts*">
          {fields?.map((item: any, index) => (
            <fieldset key={item.id}>
              <AutoComplete
                label="Contact*"
                name={`${fieldArrayName}[${index}].contact`}
                options={data?.data as any[]}
                selected={item?.contact || undefined}
              />
              <MultiSelect
                label="Roles*"
                name={`${fieldArrayName}[${index}].roles`}
                options={abstractRoles}
                selected={item?.roles || undefined}
              />
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </fieldset>
          ))}
          <Button
            onClick={() =>
              append({ contact: [], roles: [], order: fields.length })
            }
          >
            Add Contact
          </Button>
        </Section>
      </Stack>
    </Box>
  );
};

export default FieldArray;
