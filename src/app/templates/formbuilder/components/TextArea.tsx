import Stack from "@mui/material/Stack";
import MuiTextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";

import Error from "./Error";

interface TextFieldProps {
  type: "text";
  label: string;
  name: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
  isDisabled?: boolean;
  error?: string;
}

const TextField = ({
  type,
  label,
  name,
  variant = "outlined",
  isDisabled = false,
  error,
}: TextFieldProps) => {
  const { register } = useFormContext();

  return (
    <Stack sx={{ width: "100%" }} spacing={1}>
      <MuiTextField
        type={type}
        label={label}
        variant={variant}
        disabled={isDisabled}
        multiline
        rows={6}
        {...register(name)}
      />
      <Error name={name} error={error} />
    </Stack>
  );
};

export default TextField;
