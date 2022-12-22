import Stack from "@mui/material/Stack";

import TextField from "./TextField";
interface LoginFieldProps {
  value: {
    oldPassword: string;
    password1: string;
    password2: string;
  };
  variant?: "standard" | "filled" | "outlined" | undefined;
  error?: string;
}

const ChangePasswordField = ({
  value: {
    oldPassword = "oldPassword",
    password1 = "password1",
    password2 = "password2",
  },
  variant = "outlined",
  error,
}: LoginFieldProps) => {
  return (
    <Stack spacing={1}>
      <TextField
        type="text"
        label="Old Password"
        name={oldPassword}
        variant={variant}
        error={error}
      />
      <TextField
        type="text"
        label="New Password"
        name={password1}
        variant={variant}
        error={error}
      />
      <TextField
        type="text"
        label="Confirm Password"
        name={password2}
        variant={variant}
        error={error}
      />
    </Stack>
  );
};

export default ChangePasswordField;
