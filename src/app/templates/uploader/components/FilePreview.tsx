import Box from "@mui/material/Box";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface FilePreviewProps {
  file: string;
}

const FilePreview = ({ file }: FilePreviewProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        padding: 1,
        border: 1,
        borderColor: "grey.500",
        borderRadius: 1,
      }}
    >
      <Stack spacing={1} direction="row" alignItems="center">
        <FilePresentIcon />
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {file}
        </Typography>
      </Stack>
    </Box>
  );
};

export default FilePreview;
