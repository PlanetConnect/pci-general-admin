import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

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
