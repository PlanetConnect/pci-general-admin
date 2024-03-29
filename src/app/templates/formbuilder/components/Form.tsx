import { yupResolver } from "@hookform/resolvers/yup";
import Stack from "@mui/material/Stack";
import Container from "@mui/system/Container";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AnyObjectSchema } from "yup";

interface FormProps {
  size: "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  defaultValues: object;
  validationSchema: AnyObjectSchema;
  onSubmit: (values: any) => void;
}

const Form = ({
  size,
  children,
  defaultValues,
  validationSchema,
  onSubmit,
}: FormProps) => {
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  // const values = methods.watch();
  // console.log("🚀 ~ file: Form.tsx ~ line 32 ~ values", values);
  const handleFormSubmit = (data: unknown) => {
    onSubmit(data);
  };

  return (
    <Container maxWidth={size}>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            return methods.handleSubmit(handleFormSubmit)(e);
          }}
        >
          <Stack sx={{ width: "100%" }} spacing={1}>
            {children}
          </Stack>
        </form>
      </FormProvider>
    </Container>
  );
};

export default Form;
