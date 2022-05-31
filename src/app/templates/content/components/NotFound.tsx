import Typography from "@mui/material/Typography";

import PaperContent from "./PaperContent";
import Title from "./Title";

const NotFound = () => {
  return (
    <PaperContent>
      <Title text="Page Not Found. 404!" />
      <Typography variant="body2">
        The page you're looking for isn't found.
      </Typography>
    </PaperContent>
  );
};

export default NotFound;
