import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

interface SectionProps {
  name: string;
  children: React.ReactNode;
}

const Section = ({ name, children }: SectionProps) => {
  return (
    <Stack spacing={1} sx={{ marginBottom: 1 }}>
      <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
        {name}
      </Typography>
      {children}
    </Stack>
  );
};

export default Section;
