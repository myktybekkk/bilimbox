export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
      <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}
