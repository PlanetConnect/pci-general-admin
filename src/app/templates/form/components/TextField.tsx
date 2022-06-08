import { useField, FieldHookConfig } from "formik";

import MuiTextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { Alert } from "../../alert";

interface TextFieldProps {
  type: "text" | "number";
  label: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
}

const TextField = ({
  type,
  label,
  variant = "outlined",
  ...props
}: TextFieldProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <Stack sx={{ width: "100%" }} spacing={1}>
      <MuiTextField {...field} type={type} label={label} variant={variant} />
      {meta.touched && meta.error ? (
        <Alert severity="error">{meta.touched && meta.error}</Alert>
      ) : null}
    </Stack>
  );
};

export default TextField;
