import { Chip } from "@/components/Chip";
import type { CaseStack as CaseStackModel } from "@/models/case-content";

type CaseStackProps = {
  stack: CaseStackModel;
};

export function CaseStack({ stack }: CaseStackProps) {
  const { label, groups, note } = stack;
  const filledGroups = groups.filter((group) => group.chips.length > 0);

  return (
    <div className="flex flex-col gap-6">
      <p className="font-mono text-xs uppercase tracking-widest text-brand-text">
        {label}
      </p>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-x-10 gap-y-6">
          {filledGroups.map((group, index) => {
            const labelId = group.label
              ? `case-stack-group-${index}`
              : undefined;

            return (
              <div key={group.label ?? index} className="flex flex-col gap-3">
                {group.label && (
                  <p id={labelId} className="font-mono text-xs text-fg-muted">
                    {group.label}
                  </p>
                )}
                <ul
                  aria-labelledby={labelId}
                  aria-label={labelId ? undefined : label}
                  className="m-0 flex list-none flex-wrap gap-2 p-0"
                >
                  {group.chips.map((chip) => (
                    <li key={chip}>
                      <Chip
                        label={chip}
                        main={group.mainChips.includes(chip)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        {note && <p className="text-sm text-fg-muted">{note}</p>}
      </div>
    </div>
  );
}
