import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

interface EditButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  size?: "medium" | "small";
}

const EditButton = ({ onClick, size = "medium" }: EditButtonProps) => {
  return (
    <Button
      variant="contained"
      startIcon={<EditIcon />}
      onClick={onClick}
      size={size}
    >
      Edit
    </Button>
  );
};

export default EditButton;
