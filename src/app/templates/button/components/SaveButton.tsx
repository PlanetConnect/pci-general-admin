import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";

interface SaveButtonProps {
  size?: "medium" | "small";
}

const SaveButton = ({ size = "medium" }: SaveButtonProps) => {
  return (
    <Button
      type="submit"
      variant="contained"
      startIcon={<SaveIcon />}
      size={size}
    >
      Save
    </Button>
  );
};

export default SaveButton;
