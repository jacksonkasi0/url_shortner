import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { UilAngleDown } from "@iconscout/react-unicons";

const AccordionBox = ({ Title1, Title2, Title3, Content }) => {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<UilAngleDown />}>
          {Title1 && Title1}
          {Title2 && Title2}
          {Title3 && Title3}
        </AccordionSummary>
        <AccordionDetails>{Content}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionBox;
