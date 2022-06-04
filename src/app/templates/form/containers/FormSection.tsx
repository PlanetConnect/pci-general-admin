import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface FormSectionProps {
  name: string;
  children: React.ReactNode;
}

const FormSection = (props: FormSectionProps) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Stack spacing={2}>
        <Typography variant="subtitle1">{props.name}</Typography>
        {props.children}
      </Stack>
    </Box>
  );
};

export default FormSection;
