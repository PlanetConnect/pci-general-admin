import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import React from "react";
import { useNavigate } from "react-router-dom";

import { EditButton } from "../../app/templates/button";
import { PaperContent, Title } from "../../app/templates/content";
import { Actions } from "../../app/templates/formbuilder";
import { Table } from "../../app/templates/table";
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

const columns = [
  {
    name: "isActive",
    label: "Is Active?",
  },
  {
    name: "name",
    label: "Name",
  },
  {
    name: "type",
    label: "Type",
  },
  {
    name: "submissions",
    label: "Submissions",
  },
  {
    name: "actions",
    label: "Actions",
  },
];

const FormList = () => {
  const navigate = useNavigate();
  const display = forms.map((form) => {
    return {
      name: form.name,
      type: form.type,
      isActive: (
        <Chip
          label={form.isActive ? "Active" : "Inactive"}
          color={form.isActive ? "success" : "error"}
        />
      ),
      submissions: form.submissions,
      actions: (
        <EditButton
          size="small"
          onClick={() => {
            navigate(`/forms/${form.formId}`);
          }}
        />
      ),
    };
  });

  return (
    <PaperContent>
      <Title>Forms</Title>
      <Container maxWidth="lg">
        <Box sx={{ margin: 2 }}>
          <Table data={display} columns={columns} />
        </Box>
        <Actions>
          <AddForm />
        </Actions>
      </Container>
    </PaperContent>
  );
};

export default FormList;
