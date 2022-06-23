import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";

interface UploadButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const UploadButton = ({ onClick }: UploadButtonProps) => {
  return (
    <Button
      type="submit"
      variant="contained"
      startIcon={<UploadIcon />}
      onClick={onClick}
    >
      Upload File
    </Button>
  );
};

export default UploadButton;
