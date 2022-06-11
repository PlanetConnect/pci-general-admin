import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import FeedIcon from "@mui/icons-material/Feed";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Edit from "@mui/icons-material/Edit";

import { Accordion } from "../../app/templates/accordion";
import { FormActions } from "../../app/templates/form";
import { PaperContent, Title } from "../../app/templates/content";

import AddForm from "./AddForm";

const forms = [
  {
    formId: "06a5ba5a-4f15-4147-a110-ec3318712345",
    showId: "06a5ba5a-4f15-4147-a110-ec33187c4bff",
    name: "Registration",
    type: "registration",
    isActive: true,
    submissions: 42,
  },
  {
    formId: "06a5ba5a-4f15-4147-a110-ec3318778901",
    showId: "06a5ba5a-4f15-4147-a110-ec33187c4bff",
    name: "Abstract Submission",
    type: "abstract-submission",
    isActive: false,
    submissions: 10,
  },
];

const FormList = () => {
  return (
    <PaperContent>
      <Title>Forms</Title>
      <Container maxWidth="lg">
        <Box sx={{ marginBottom: 2 }}>
          {forms.map((form) => {
            return (
              <Accordion
                key={form.formId}
                summary={
                  <Stack spacing={1} direction="row" alignItems="center">
                    <Typography sx={{ fontWeight: 800 }}>
                      {form.name}
                    </Typography>
                    <Chip
                      label={form.isActive ? "Active" : "Inactive"}
                      color={form.isActive ? "success" : "error"}
                    />
                  </Stack>
                }
              >
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  alignContent="center"
                >
                  <Grid item xs={10}>
                    <Stack spacing={1} direction="row" alignItems="center">
                      <FeedIcon />
                      <Typography variant="body2">Submissions:</Typography>
                      <Typography sx={{ fontWeight: 800 }} variant="body2">
                        {form.submissions}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      href={`/forms/${form.formId}`}
                      size="small"
                      variant="outlined"
                      startIcon={<Edit />}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </Accordion>
            );
          })}
        </Box>
        <FormActions>
          <AddForm />
        </FormActions>
      </Container>
    </PaperContent>
  );
};

export default FormList;
