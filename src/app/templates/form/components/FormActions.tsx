import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

interface FormActionProps {
  children: React.ReactNode;
}

const FormActions = (props: FormActionProps) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Stack direction="row" spacing={2} justifyContent="end">
        {props.children}
      </Stack>
    </Box>
  );
};

export default FormActions;
