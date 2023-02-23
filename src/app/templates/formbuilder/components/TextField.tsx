import Stack from "@mui/material/Stack";
import MuiTextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

import Error from "./Error";

interface TextFieldProps {
  type: "text" | "number" | "password";
  label: string;
  name: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
  value?: string;
  error?: string;
  isDisabled?: boolean;
  onChange?: (text: string) => void;
  required?: boolean;
}

const TextField = ({
  type,
  label,
  name,
  variant = "outlined",
  value,
  isDisabled = false,
  error,
  onChange,
  required,
}: TextFieldProps) => {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  });

  const handleChange = (text: string) => {
    if (onChange) {
      onChange(text);
    }
  };

  return (
    <Stack sx={{ width: "100%" }} spacing={1}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          // console.log("🚀 ~ file: TextField.tsx:71 ~ error", error);

          return (
            <MuiTextField
              // InputLabelProps={{ shrink: true }}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                handleChange(e.target.value);
              }}
              type={type}
              label={required ? `${label} *` : label}
              variant={variant}
              disabled={isDisabled}
            />
          );
        }}
      />
      <Error name={name} error={error} />
    </Stack>
  );
};

export default TextField;
