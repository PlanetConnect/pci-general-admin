import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  size?: "medium" | "small";
}

const DeleteButton = ({ onClick, size = "medium" }: DeleteButtonProps) => {
  return (
    <Button
      variant="outlined"
      startIcon={<DeleteIcon />}
      onClick={onClick}
      size={size}
      color="error"
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
