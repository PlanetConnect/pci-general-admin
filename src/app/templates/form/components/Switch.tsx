import { useField, FieldHookConfig } from "formik";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiSwitch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";

import { Alert } from "../../alert";

interface SwitchProps {
  label: string;
  isChecked: boolean;
}

const Switch = ({
  label,
  isChecked,
  ...props
}: SwitchProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  return (
    <Stack sx={{ width: "100%" }} spacing={1}>
      <FormGroup>
        <FormControlLabel
          control={<MuiSwitch {...field} defaultChecked={isChecked} />}
          label={label}
        />
      </FormGroup>
      {meta.touched && meta.error ? (
        <Alert severity="error">{meta.touched && meta.error}</Alert>
      ) : null}
    </Stack>
  );
};

export default Switch;
