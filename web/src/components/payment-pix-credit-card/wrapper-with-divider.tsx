import  Divider  from "@mui/material/Divider";

export function WrapperWithDivider({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mt-3 flex flex-col gap-2 ${className}`}>
      {children}
      <Divider sx={{ borderBottomWidth: "2px" }} />
    </div>
  );
}
