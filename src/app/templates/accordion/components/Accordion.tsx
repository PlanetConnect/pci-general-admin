import React from "react";

import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AccordionProps {
  summary: React.ReactNode;
  children: React.ReactNode;
}

const Accordion = (props: AccordionProps) => {
  return (
    <MuiAccordion TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {props.summary}
      </AccordionSummary>
      <Divider />
      <AccordionDetails>{props.children}</AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
