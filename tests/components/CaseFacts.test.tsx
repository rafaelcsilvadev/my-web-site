import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CaseFacts } from "@/components/CaseFacts";
import type { Fact } from "@/models/case-content";

afterEach(cleanup);

const facts: Fact[] = [
  { label: "Any company label", value: "Any company value" },
  { label: "Any role label", value: "Any role value" },
  { label: "Any state label", value: "Any state value" },
];

describe("CaseFacts", () => {
  it("renders each fact as a dt label paired with its dd value", () => {
    const { container } = render(<CaseFacts facts={facts} />);

    const terms = Array.from(container.querySelectorAll("dl dt"));
    const definitions = Array.from(container.querySelectorAll("dl dd"));

    expect(terms.map((term) => term.textContent)).toEqual(facts.map((fact) => fact.label));
    expect(definitions.map((definition) => definition.textContent)).toEqual(
      facts.map((fact) => fact.value),
    );
    expect(screen.getByText("Any role label").nextElementSibling).toHaveTextContent(
      "Any role value",
    );
  });

  it("renders nothing when the list is empty", () => {
    const { container } = render(<CaseFacts facts={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
