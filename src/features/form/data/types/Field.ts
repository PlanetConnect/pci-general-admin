interface Field {
  fieldId: string;
  type: "textfield" | "number" | "select" | "textarea" | "switch";
  name: string;
  label: string;
  isActive: boolean;
  validations: {
    isRequired: boolean;
    max?: number;
    min?: number;
    type: "string" | "number" | "boolean" | "email" | "url";
  };
  options?: {
    option: string;
    value: string | number;
  }[];
}

export default Field;
