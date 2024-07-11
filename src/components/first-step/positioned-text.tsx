export function PositionedText({
  className,
  text,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span
      className={`absolute flex items-center justify-center rounded-2xl bg-gray-300 px-6 py-1 ${className}`}
    >
      <p className="whitespace-nowrap font-semibold">{text}</p>
    </span>
  );
}
