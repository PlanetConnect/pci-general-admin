import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";

interface FormHeaderProps {
  children: React.ReactNode;
}

const FormHeader = (props: FormHeaderProps) => {
  return (
    <Box sx={{ marginBottom: 1 }}>
      <Typography variant="h6">{props.children}</Typography>
    </Box>
  );
};

export default FormHeader;
