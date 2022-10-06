import Box from "@mui/material/Box";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { MIME, Uploader } from "../../uploader";

interface FileUploadProps {
  name: string;
  accepted: MIME;
}

const FileUpload = ({ name, accepted }: FileUploadProps) => {
  const { control, setValue } = useFormContext();

  const handleChange = (data: File[]) => {
    setValue(name, data);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <input type="hidden" value={value} onChange={onChange} />
        )}
      />
      <Uploader onChange={(e) => handleChange} accepted={accepted} />
    </Box>
  );
};

export default FileUpload;
