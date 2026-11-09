import type { MethodStep as MethodStepModel } from "@/models/home-content";
import { toMethodStepView } from "@/viewmodels/home-view-model";

type MethodStepProps = {
  step: MethodStepModel;
  humanLabel: string;
  aiLabel: string;
};

const BASE = "card-glow flex flex-col gap-2.5 rounded-lg border p-4";
const BADGE = "mt-0.5 shrink-0 rounded border px-1.5 font-mono text-[10px] leading-4";

export function MethodStep({ step, humanLabel, aiLabel }: MethodStepProps) {
  const { number, title, human, ai, highlight } = toMethodStepView(step);
  const tone = highlight
    ? "border-brand-text/40 bg-brand/15"
    : "border-line bg-card-from";

  return (
    <article className={`${BASE} ${tone}`}>
      <span className="font-mono text-[11px] text-brand-text">{number}</span>
      <h3 className="text-[15px] font-semibold text-fg">{title}</h3>
      <p className="flex items-start gap-2 text-[13px] leading-snug text-fg-muted">
        <span className={`${BADGE} border-line bg-white/5 text-fg-muted`}>{humanLabel}</span>
        {human}
      </p>
      {ai ? (
        <p className="flex items-start gap-2 text-[13px] leading-snug text-fg-muted">
          <span className={`${BADGE} border-brand-text/40 bg-brand/20 text-brand-light`}>
            {aiLabel}
          </span>
          {ai}
        </p>
      ) : null}
    </article>
  );
}
