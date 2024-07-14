type ErrorMessageProps = { title: string; body: React.ReactNode };

export function ErrorMessage({ title, body }: ErrorMessageProps) {
  return (
    <span className="mt-4 flex flex-col items-center gap-1">
      <p className="text-2xl font-bold text-red-500">
{title}
      </p>
      {body}    </span>
  );
}
