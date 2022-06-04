import Typography from "@mui/material/Typography";

import PaperContent from "./PaperContent";
import Title from "./Title";

const NotFound = () => {
  return (
    <PaperContent>
      <Title>Page Not Found!</Title>
      <Typography variant="body2">
        The page you're looking for isn't found.
      </Typography>
    </PaperContent>
  );
};

export default NotFound;
