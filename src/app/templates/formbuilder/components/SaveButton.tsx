import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";

const SaveButton = () => {
  return (
    <Box sx={{ flex: 1 }}>
      <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
        Save Changes
      </Button>
    </Box>
  );
};

export default SaveButton;
