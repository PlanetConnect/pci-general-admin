import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface SectionProps {
  name: string;
  children: React.ReactNode;
}

const Section = ({ name, children }: SectionProps) => {
  return (
    <Stack spacing={1} sx={{ marginBottom: 1 }}>
      <Typography variant="subtitle1">{name}</Typography>
      {children}
    </Stack>
  );
};

export default Section;
