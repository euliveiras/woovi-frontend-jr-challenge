type SuccessMessageProps = { title: string; body: React.ReactNode };

export function SuccessMessage({ title, body }: SuccessMessageProps) {
  return (
    <span className="mt-4 flex flex-col items-center gap-1">
      <p className="text-2xl font-bold text-custom-green-400">{title}</p>
      {body}
    </span>
  );
}
