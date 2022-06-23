import { useFormContext } from "react-hook-form";
import { Alert } from "../../alert";

import Box from "@mui/material/Box";

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
    displayedError = errors[name].message;
  } else {
    displayedError = error;
  }

  return (
    <Box sx={{ flex: 1 }}>
      {displayedError ? <Alert severity="error">{displayedError}</Alert> : null}
    </Box>
  );
};

export default Error;
