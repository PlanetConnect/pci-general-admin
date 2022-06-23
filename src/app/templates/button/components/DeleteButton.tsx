import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <Button
      type="submit"
      variant="outlined"
      startIcon={<DeleteIcon />}
      onClick={onClick}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
