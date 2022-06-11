import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

interface FormBodyProps {
  children: React.ReactNode;
}

const FormBody = (props: FormBodyProps) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Stack spacing={2}>{props.children}</Stack>
    </Box>
  );
};

export default FormBody;
