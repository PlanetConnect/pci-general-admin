import React from "react";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Stack from "@mui/material/Stack";

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <Stack sx={{ width: "100%", marginBottom: 2 }} spacing={1}>
      <Typography variant="h6">{children}</Typography>
      <Divider />
    </Stack>
  );
};

export default Header;
