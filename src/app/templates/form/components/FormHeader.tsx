import React from "react";

import Box from "@mui/system/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import FormActions from "./FormActions";
import SaveButton from "../components/SaveButton";

interface FormHeaderProps {
  children: React.ReactNode;
}

const FormHeader = (props: FormHeaderProps) => {
  return (
    <React.Fragment>
      <Box sx={{ flex: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h6">{props.children}</Typography>
          </Grid>
          <Grid item xs={4}>
            <FormActions>
              <SaveButton />
            </FormActions>
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </React.Fragment>
  );
};

export default FormHeader;
