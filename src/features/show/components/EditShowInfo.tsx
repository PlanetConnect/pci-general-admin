import React from "react";
import ReactDOM from "react-dom";
import { useFormik, Field } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface EditShowInfoProps {
  show: object;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const EditShowInfo = (prop: EditShowInfoProps) => {
  return <h1>Content</h1>;
};

export default EditShowInfo;
