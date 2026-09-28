export default function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">

      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-violet-600">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-bold tracking-tight text-violet-950 sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 leading-7 text-slate-600">
          {description}
        </p>
      )}

    </div>
  );
}