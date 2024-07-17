import AccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function Summary({ children, ...props }: AccordionSummaryProps) {
  return (
    <AccordionSummary
      {...props}
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1-content"
      id="panel1-header"
      sx={{ backgroundColor: "transparent", border: 0 }}
      className="text-sm font-bold"
    >
      {children}
    </AccordionSummary>
  );
}
