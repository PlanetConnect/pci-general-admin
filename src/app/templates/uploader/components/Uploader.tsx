import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { UploadButton } from "../../button";
import { FilePreview, ImagePreview, MIME } from "../../uploader";

const MAX_FILE_SIZE = 52428800;
const MAX_FILES = 1;

interface UploaderProps {
  accepted: MIME;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Uploader = ({ accepted, onChange }: UploaderProps) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      onChange(acceptedFiles);
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [onChange]
  );

  const { open } = useDropzone({
    onDrop,
    accept: accepted,
    maxFiles: MAX_FILES,
    maxSize: MAX_FILE_SIZE,
  });

  const preview = files.map((file: any) => {
    return (
      <Stack key={file.name}>
        {file.type.includes("image") ? (
          <ImagePreview width={300} height="100%" url={file.preview} />
        ) : (
          <FilePreview file={file.name} />
        )}
      </Stack>
    );
  });

  let extensions = "";

  for (const extension in accepted) {
    extensions = extensions.concat(accepted[extension].join(" "), " ");
  }

  useEffect(() => {
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <Box sx={{ flex: 1 }}>
      <Stack spacing={1}>{preview}</Stack>
      <Stack spacing={1}>
        <Box sx={{ marginTop: 1 }}>
          <UploadButton
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
          />
        </Box>
        <Typography variant="body2">
          Allowed File Types: {extensions}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Uploader;
