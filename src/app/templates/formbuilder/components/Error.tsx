import Box from "@mui/material/Box";
import { useFormContext } from "react-hook-form";

import { Alert } from "../../alert";

interface ErrorProps {
  name: string;
  error: string | undefined;
}

const Error = ({ name, error }: ErrorProps) => {
  let displayedError;
  const {
    formState: { errors },
  } = useFormContext();

  if (typeof error == "undefined" && errors[name]) {
    displayedError = errors?.[name]?.message;
  } else {
    displayedError = error;
  }

  return (
    <Box sx={{ flex: 1 }}>
      {displayedError ? (
        <Alert severity="error">{String(displayedError)}</Alert>
      ) : null}
    </Box>
  );
};

export default Error;
