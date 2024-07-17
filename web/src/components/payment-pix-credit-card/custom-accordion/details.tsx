import AccordionDetails, {
  AccordionDetailsProps,
} from "@mui/material/AccordionDetails";

export function Details({ children, ...props }: AccordionDetailsProps) {
  return <AccordionDetails {...props}>{children}</AccordionDetails>;
}
