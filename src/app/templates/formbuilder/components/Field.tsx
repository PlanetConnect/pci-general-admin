import { useFormContext } from "react-hook-form";

import ColorPickerField from "./ColorPickerField";
import FieldSet from "./FieldSet";
import Select from "./Select";
import Switch from "./Switch";
import TextArea from "./TextArea";
import TextField from "./TextField";

interface FieldProps {
  field: any;
}

const Field = ({ field }: FieldProps) => {
  const { getValues } = useFormContext();

  const component = {
    colorpicker: <ColorPickerField {...field} value={getValues(field.name)} />,
    fieldarray: <FieldSet name={field.name} set={field} />,
    select: <Select {...field} />,
    switch: <Switch {...field} />,
    textfield: <TextField {...field} />,
    textarea: <TextArea {...field} />,
  }[field.type as string];

  if (!component) {
    return <p>Field type not yet implemented</p>;
  }

  return component;
};

export default Field;
