import Box from "@mui/system/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

interface TitleProps {
  text: string;
  align?: "right" | "left" | "inherit" | "center" | "justify" | undefined;
}

const Title = (props: TitleProps) => {
  return (
    <Box sx={{ marginBottom: 1 }}>
      <Typography variant="h6" gutterBottom align={props.align}>
        {props.text}
      </Typography>
      <Divider />
    </Box>
  );
};

export default Title;
