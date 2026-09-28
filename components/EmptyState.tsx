export default function EmptyState({
  message = "Nothing available yet."
}: {
  message?: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-violet-200 bg-violet-50/60 p-10 text-center text-slate-600">
      {message}
    </div>
  );
}