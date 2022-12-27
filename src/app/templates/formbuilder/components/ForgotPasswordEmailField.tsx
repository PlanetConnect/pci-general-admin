import Stack from "@mui/material/Stack";

import TextField from "./TextField";
interface ForgotPasswordEmailFieldProps {
  value: {
    email: string;
  };
  variant?: "standard" | "filled" | "outlined" | undefined;
  error?: string;
}

const ForgotPasswordEmailField = ({
  value: { email = "email" },
  variant = "outlined",
  error,
}: ForgotPasswordEmailFieldProps) => {
  return (
    <Stack spacing={1}>
      <TextField
        type="text"
        label="Email"
        name={email}
        variant={variant}
        error={error}
      />
    </Stack>
  );
};

export default ForgotPasswordEmailField;
