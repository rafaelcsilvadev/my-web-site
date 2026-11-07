import type { MethodStep as MethodStepModel } from "@/models/home-content";
import { toMethodStepView } from "@/viewmodels/home-view-model";

type MethodStepProps = {
  step: MethodStepModel;
  humanLabel: string;
  aiLabel: string;
};

const BASE = "flex flex-col gap-3 rounded-2xl border bg-card-from p-6";

export function MethodStep({ step, humanLabel, aiLabel }: MethodStepProps) {
  const { number, title, human, ai, highlight } = toMethodStepView(step);
  const border = highlight ? "border-brand-text" : "border-line";

  return (
    <article className={`${BASE} ${border}`}>
      <span className="font-mono text-xs text-brand-light">{number}</span>
      <h3 className="text-xl font-bold text-fg">{title}</h3>
      <p className="text-fg-muted">
        <span className="mr-2 font-mono text-xs text-brand-light">{humanLabel}</span>
        {human}
      </p>
      {ai ? (
        <p className="text-fg-muted">
          <span className="mr-2 font-mono text-xs text-brand-light">{aiLabel}</span>
          {ai}
        </p>
      ) : null}
    </article>
  );
}
