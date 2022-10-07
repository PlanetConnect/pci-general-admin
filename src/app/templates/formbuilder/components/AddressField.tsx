import Stack from "@mui/material/Stack";

import countries from "../data/countries";
import states from "../data/states";
import Select from "./Select";
import TextField from "./TextField";

interface AddressFieldProps {
  address: {
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  variant?: "standard" | "filled" | "outlined" | undefined;
  error?: string;
}

const AddressField = ({
  address: {
    address1 = "address1",
    address2 = "address2",
    city = "city",
    state = "state",
    zip = "zip",
    country = "country",
  },
  variant = "outlined",
  error,
}: AddressFieldProps) => {
  return (
    <Stack spacing={1}>
      <TextField
        type="text"
        label="Address 1"
        name={address1}
        variant={variant}
        error={error}
      />
      <TextField
        type="text"
        label="Address 2"
        name={address2}
        variant={variant}
        error={error}
      />
      <TextField
        type="text"
        label="City"
        name={city}
        variant={variant}
        error={error}
      />
      <Select
        label="State"
        name={state}
        variant={variant}
        options={states}
        error={error}
      />

      <Stack direction="row" spacing={2}>
        <Select
          label="Country"
          name={country}
          variant={variant}
          options={countries}
          error={error}
        />
        <TextField
          type="text"
          label="Zip"
          name={zip}
          variant={variant}
          error={error}
        />
      </Stack>
    </Stack>
  );
};

export default AddressField;
