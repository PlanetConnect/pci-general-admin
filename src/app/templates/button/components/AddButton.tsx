import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

interface AddButtonProps {
  size?: "medium" | "small";
}

const AddButton = ({ size = "medium" }: AddButtonProps) => {
  return (
    <Button
      type="submit"
      variant="contained"
      startIcon={<AddIcon />}
      size={size}
    >
      Add
    </Button>
  );
};

export default AddButton;
