import Stack from "@mui/material/Stack";

import TextField from "./TextField";
interface LoginFieldProps {
  value: {
    code: string;
  };
  variant?: "standard" | "filled" | "outlined" | undefined;
  error?: string;
}

const LoginMfaField = ({
  value: { code = "code" },
  variant = "outlined",
  error,
}: LoginFieldProps) => {
  return (
    <Stack spacing={1}>
      <TextField
        type="text"
        label="Code"
        name={code}
        variant={variant}
        error={error}
      />
    </Stack>
  );
};

export default LoginMfaField;
