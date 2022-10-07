import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { v4 as uuidv4 } from "uuid";

import { MiniAddButton } from "../../button";
import Field from "./Field";
import { useFieldArrayMethods } from "./FieldArray";
import Section from "./Section";

interface FieldSetProps {
  name: string;
  set: any;
}

const FieldSet = ({ name, set }: FieldSetProps) => {
  const { fields, append } = useFieldArrayMethods(name);
  const { id, ...rest } = fields[0];

  const shape: any = {};
  for (const key in rest) {
    const type = typeof rest[key as keyof typeof rest];
    let val: string | number | boolean = "";

    if (type === "boolean") {
      val = true;
    } else if (type === "number") {
      val = 0;
    }
    shape[key] = val;
  }

  console.log(shape);

  return (
    <Stack
      spacing={1}
      sx={{
        border: 1,
        borderRadius: 2,
        padding: 2,
        borderColor: "grey.500",
      }}
    >
      <Section name={name}>
        {fields.map((field: any, index: number) => {
          const keys = Object.keys(field).map((value: any) => {
            return value;
          });
          return (
            <Stack
              key={field.id}
              sx={{
                border: 1,
                borderRadius: 2,
                padding: 2,
                borderColor: "grey.500",
              }}
            >
              {set.fields.map((formField: any) => {
                const key = keys.filter((key) => {
                  return key === formField.name;
                });

                const toGenerate = { ...formField };
                toGenerate.name = `${name}.${index}.${key[0]}`;

                return (
                  <Box key={uuidv4()}>
                    <Field field={toGenerate} />
                  </Box>
                );
              })}
            </Stack>
          );
        })}
      </Section>
      <Stack alignItems="center">
        <MiniAddButton onClick={() => append(shape)} />
      </Stack>
    </Stack>
  );
};

export default FieldSet;
