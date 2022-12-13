import Stack from "@mui/material/Stack";

import TextField from "./TextField";
interface LoginFieldProps {
  value: {
    email: string;
    password: string;
  };
  variant?: "standard" | "filled" | "outlined" | undefined;
  error?: string;
}

const LoginField = ({
  value: { email = "email", password = "password" },
  variant = "outlined",
  error,
}: LoginFieldProps) => {
  return (
    <Stack spacing={1}>
      <TextField
        type="text"
        label="Email"
        name={email}
        variant={variant}
        error={error}
      />
      <TextField
        type="text"
        label="Password"
        name={password}
        variant={variant}
        error={error}
      />
    </Stack>
  );
};

export default LoginField;
