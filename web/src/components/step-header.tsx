type StepHeaderProps = { className?: string; children: React.ReactNode };

export function StepHeader({ children, className }: StepHeaderProps) {
  return (
    <header className={`pb-4 text-center text-lg font-bold ${className}`}>
      {children}
    </header>
  );
}
