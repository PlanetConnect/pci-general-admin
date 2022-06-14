import { useField, FieldHookConfig } from "formik";
import MuiTextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { Alert } from "../../alert";

interface TextAreaProps {
  type: "text" | "number";
  label: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
  isDisabled?: boolean;
}

const TextArea = ({
  type,
  label,
  variant = "outlined",
  isDisabled = false,
  ...props
}: TextAreaProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  return (
    <Stack sx={{ width: "100%" }} spacing={1}>
      <MuiTextField
        {...field}
        type={type}
        label={label}
        variant={variant}
        multiline
        rows={6}
        disabled={isDisabled}
      />
      {meta.touched && meta.error ? (
        <Alert severity="error">{meta.touched && meta.error}</Alert>
      ) : null}
    </Stack>
  );
};

export default TextArea;
