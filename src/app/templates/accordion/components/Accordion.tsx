import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Divider from "@mui/material/Divider";
import React from "react";

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
