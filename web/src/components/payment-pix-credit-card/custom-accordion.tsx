import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

export function CustomAccordion() {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{ backgroundColor: "transparent", border: 0 }}
        className="text-sm font-bold"
      >
        Como funciona?
      </AccordionSummary>
      <AccordionDetails>
			A metade do pagamento deve ser feita em PIX e o restante pode ser parcelado no cartão.
      </AccordionDetails>
    </Accordion>
  );
}
