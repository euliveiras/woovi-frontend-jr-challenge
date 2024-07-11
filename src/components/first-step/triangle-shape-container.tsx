export function TriangleShapeContainer({ text }: { text: React.ReactNode }) {
  return (
    <span className="flex h-6 w-full items-center justify-between rounded-l bg-blue-900 text-xs text-white">
      <p className="whitespace-nowrap px-2 py-1">{text}</p>
      <div className="border-y-[14px] border-l-0 border-r-[18px] border-solid border-y-transparent border-r-slate-100"></div>
    </span>
  );
}
