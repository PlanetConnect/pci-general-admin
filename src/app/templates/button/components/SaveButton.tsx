import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";

const SaveButton = () => {
  return (
    <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
      Save Changes
    </Button>
  );
};

export default SaveButton;
