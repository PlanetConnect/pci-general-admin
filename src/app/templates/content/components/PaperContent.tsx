import Paper from "@mui/material/Paper";
import React from "react";

interface Paper {
  children: React.ReactNode;
}

const PaperContent = (props: Paper) => {
  return (
    <Paper elevation={6} sx={{ padding: 3, width: "100%" }}>
      {props.children}
    </Paper>
  );
};

export default PaperContent;
