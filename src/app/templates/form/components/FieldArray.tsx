import React from "react";
import { FieldArray as FieldArrayFormik } from "formik";

interface FieldArrayProps {
  name: string;
  component: any;
}

const FieldArray = (props: FieldArrayProps) => {
  return <FieldArrayFormik name={props.name} component={props.component} />;
};

export default FieldArray;
