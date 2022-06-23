import { useFormContext } from "react-hook-form";

import MuiTextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import Error from "./Error";

interface TextFieldProps {
  type: "text" | "number" | "password";
  label: string;
  name: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
  error?: string;
  isDisabled?: boolean;
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
        {...register(name)}
      />
      <Error name={name} error={error} />
    </Stack>
  );
};

export default TextField;
