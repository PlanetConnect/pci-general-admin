import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";

interface TitleProps {
  children: React.ReactNode;
  align?: "right" | "left" | "inherit" | "center" | "justify" | undefined;
  onCreate?: () => void;
}

const Title = (props: TitleProps) => {
  return (
    <Box sx={{ marginBottom: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom align={props.align}>
          {props.children}
        </Typography>
        {props.onCreate && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={props.onCreate}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 1,
            }}
          >
            create
          </Button>
        )}
      </Box>
      <Divider />
    </Box>
  );
};

export default Title;
