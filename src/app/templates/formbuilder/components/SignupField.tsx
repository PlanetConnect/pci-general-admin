import Stack from "@mui/material/Stack";

import TextField from "./TextField";
interface SignupFieldProps {
  value: {
    email: string;
    password: string;
    phone: string;
  };
  variant?: "standard" | "filled" | "outlined" | undefined;
  error?: string;
}

const SignupField = ({
  value: { email = "email", password = "password", phone = "phone" },
  variant = "outlined",
  error,
}: SignupFieldProps) => {
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
      <TextField
        type="text"
        label="Phone Number"
        name={phone}
        variant={variant}
        error={error}
      />
    </Stack>
  );
};

export default SignupField;
