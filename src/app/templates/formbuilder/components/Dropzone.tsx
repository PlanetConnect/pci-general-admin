import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { ImageList } from "../../image";
import { UploadButton } from "../../button";

const Dropzone = () => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { open } = useDropzone({
    onDrop,
    maxFiles: 1,
  });
  console.log(files);
  const preview = files.map((file: any, index: number) => {
    return { url: file.preview, alt: file.name };
  });

  return (
    <Box sx={{ flex: 1 }}>
      <ImageList width={300} cols={1} images={preview} />
      <UploadButton
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
      />
    </Box>
  );
};

export default Dropzone;
