import React from "react";

import { Formik, Form as FormikForm } from "formik";
import Container from "@mui/system/Container";
import Stack from "@mui/material/Stack";

import Value from "../data/Value";

interface FormProps {
  size: "xs" | "sm" | "md" | "lg" | "xl";
  initialValues: Value;
  validationSchema: object;
  children: React.ReactNode;
  validateOnChange?: boolean | undefined;
  onSubmit: (values: Value) => void;
}

const Form = (props: FormProps) => {
  return (
    <Container maxWidth={props.size}>
      <Formik
        validateOnChange={props.validateOnChange}
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          props.onSubmit(values);
          setSubmitting(false);
        }}
      >
        <FormikForm>
          <Stack sx={{ width: "100%" }} spacing={2}>
            {props.children}
          </Stack>
        </FormikForm>
      </Formik>
    </Container>
  );
};

export default Form;
