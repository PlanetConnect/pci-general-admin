import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";

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
