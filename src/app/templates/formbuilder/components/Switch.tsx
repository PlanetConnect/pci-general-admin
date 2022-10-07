import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MuiSwitch from "@mui/material/Switch";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface SwitchProps {
  label: string;
  name: string;
  isChecked: boolean;
  isDisabled?: boolean;
}

const Switch = ({
  label,
  name,
  isChecked,
  isDisabled = false,
}: SwitchProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={isChecked}
      render={({ field: { onChange, value } }) => (
        <FormGroup>
          <FormControlLabel
            control={
              <MuiSwitch
                onChange={onChange}
                checked={value}
                disabled={isDisabled}
              />
            }
            label={label}
          />
        </FormGroup>
      )}
    />
  );
};

export default Switch;
