type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  id: string;
};

const SEPARATOR = " · ";

function splitEyebrow(eyebrow: string): { number?: string; label: string } {
  const index = eyebrow.indexOf(SEPARATOR);
  if (index === -1) return { label: eyebrow };
  return {
    number: eyebrow.slice(0, index),
    label: eyebrow.slice(index + SEPARATOR.length),
  };
}

export function SectionHeading({ eyebrow, title, id }: SectionHeadingProps) {
  const { number, label } = splitEyebrow(eyebrow);

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-brand-text">
        {number !== undefined && (
          <>
            <span aria-hidden="true">{number}</span>
            <span aria-hidden="true">{SEPARATOR}</span>
          </>
        )}
        <span>{label}</span>
      </p>
      <h2 id={id} className="mt-3 text-3xl font-bold text-fg md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
