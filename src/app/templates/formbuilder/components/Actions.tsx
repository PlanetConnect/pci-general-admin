import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

interface ActionsProps {
  children: React.ReactNode;
}

const Actions = ({ children }: ActionsProps) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Stack direction="row" spacing={2} justifyContent="end">
        {children}
      </Stack>
    </Box>
  );
};

export default Actions;
