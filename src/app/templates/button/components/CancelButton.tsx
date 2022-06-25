import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";

interface CancelButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  size?: "medium" | "small";
}

const CancelButton = ({ onClick, size = "medium" }: CancelButtonProps) => {
  return (
    <Button
      variant="outlined"
      startIcon={<CancelIcon />}
      onClick={onClick}
      size={size}
    >
      Cancel
    </Button>
  );
};

export default CancelButton;
