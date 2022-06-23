import { useFieldArray, useFormContext } from "react-hook-form";

export const useFieldArrayMethods = (name: string) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: name,
    }
  );

  return { fields, errors, append, prepend, remove, swap, move, insert };
};
