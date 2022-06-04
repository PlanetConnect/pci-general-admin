import TextField from "./TextField";
import Stack from "@mui/material/Stack";

interface NameFieldProps {
  firstName: string;
  lastName: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
}

const NameField = ({
  firstName,
  lastName,
  variant = "outlined",
}: NameFieldProps) => {
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        type="text"
        label="First Name"
        name={firstName}
        variant={variant}
      />
      <TextField
        type="text"
        label="Last Name"
        name={lastName}
        variant={variant}
      />
    </Stack>
  );
};

export default NameField;
