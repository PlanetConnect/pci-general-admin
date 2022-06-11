import React from "react";

import Paper from "@mui/material/Paper";

interface PaperContentProps {
  children: React.ReactNode;
}

const PaperContent = (props: PaperContentProps) => {
  return (
    <Paper elevation={6} sx={{ padding: 3, width: "100%" }}>
      {props.children}
    </Paper>
  );
};

export default PaperContent;
