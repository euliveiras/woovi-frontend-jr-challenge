type ErrorMessageProps = { title: string; body?: React.ReactNode, titleProps?: { className: string } };

export function ErrorMessage({ title, body, titleProps }: ErrorMessageProps) {
	const titleClassName = titleProps?.className
  return (
    <span className="mt-4 flex flex-col items-center gap-1">
      <p className={`text-2xl font-bold text-red-500 ${titleClassName}`}>{title}</p>
      {body}
    </span>
  );
}
