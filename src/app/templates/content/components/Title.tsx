import Box from "@mui/system/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

interface TitleProps {
  children: React.ReactNode;
  align?: "right" | "left" | "inherit" | "center" | "justify" | undefined;
}

const Title = (props: TitleProps) => {
  return (
    <Box sx={{ marginBottom: 1 }}>
      <Typography variant="h6" gutterBottom align={props.align}>
        {props.children}
      </Typography>
      <Divider />
    </Box>
  );
};

export default Title;
