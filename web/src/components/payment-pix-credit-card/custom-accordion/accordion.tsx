import Accordion, { AccordionProps } from "@mui/material/Accordion";

type ContainerProps = AccordionProps;
export function Container({ children, ...props }: ContainerProps) {
  return <Accordion {...props}>{children}</Accordion>;
}
