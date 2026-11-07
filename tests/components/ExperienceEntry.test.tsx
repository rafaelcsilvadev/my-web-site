import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ExperienceEntry } from "@/components/ExperienceEntry";
import type { ExperienceEntry as ExperienceEntryModel } from "@/models/home-content";

afterEach(cleanup);

const entry: ExperienceEntryModel = {
  company: "Any Company",
  duration: "2 anos",
  period: "jan. de 2020 - fev. de 2021",
  role: "Any Role",
  achievements: [{ lead: "Lead.", text: "Body text." }, { text: "Plain text." }],
  tags: ["Tag A", "Tag B"],
  mainTags: ["Tag A"],
  note: "Any note.",
  link: { label: "Any link", href: "/casos/any" },
};

describe("ExperienceEntry", () => {
  it("renders the company as h3 and the role", () => {
    render(<ExperienceEntry entry={entry} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Any Company");
    expect(screen.getByText("Any Role")).toBeInTheDocument();
  });

  it("renders the duration and the period when present", () => {
    render(<ExperienceEntry entry={entry} />);
    expect(screen.getByText("2 anos")).toBeInTheDocument();
    expect(screen.getByText("jan. de 2020 - fev. de 2021")).toBeInTheDocument();
  });

  it("renders no period element when the period is empty", () => {
    const { container } = render(<ExperienceEntry entry={{ ...entry, period: "  ", duration: undefined }} />);
    expect(screen.queryByText("jan. de 2020 - fev. de 2021")).not.toBeInTheDocument();
    expect(container.querySelector("[data-period]")).toBeNull();
    expect(container.querySelector("[data-duration]")).toBeNull();
  });

  it("renders the lead-in inside strong followed by the text", () => {
    const { container } = render(<ExperienceEntry entry={entry} />);
    const strong = container.querySelector("strong");
    expect(strong).toHaveTextContent("Lead.");
    expect(strong?.parentElement).toHaveTextContent("Lead. Body text.");
  });

  it("renders an achievement without lead-in and no strong for it", () => {
    const { container } = render(<ExperienceEntry entry={{ ...entry, achievements: [{ text: "Plain text." }] }} />);
    expect(screen.getByText("Plain text.")).toBeInTheDocument();
    expect(container.querySelector("strong")).toBeNull();
  });

  it("renders every tag as a list item", () => {
    render(<ExperienceEntry entry={entry} />);
    expect(screen.getAllByRole("listitem").map((item) => item.textContent)).toEqual(["Tag A", "Tag B"]);
  });

  it("highlights only the main tags", () => {
    render(<ExperienceEntry entry={entry} />);
    expect(screen.getByText("Tag A")).toHaveClass("bg-brand/15");
    expect(screen.getByText("Tag B")).not.toHaveClass("bg-brand/15");
  });

  it("renders the company detail muted inside the h3", () => {
    render(<ExperienceEntry entry={{ ...entry, companyDetail: "· Detail" }} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Any Company · Detail");
    expect(screen.getByText("· Detail")).toHaveClass("font-normal");
  });

  it("renders the period as a bordered badge", () => {
    const { container } = render(<ExperienceEntry entry={entry} />);
    expect(container.querySelector("[data-period]")).toHaveClass("border");
  });

  it("renders no tag container when tags are empty", () => {
    render(<ExperienceEntry entry={{ ...entry, tags: [] }} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders the note and the link with its href", () => {
    render(<ExperienceEntry entry={entry} />);
    expect(screen.getByText("Any note.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Any link" })).toHaveAttribute("href", "/casos/any");
  });

  it("renders no link and no note when the entry has none", () => {
    render(<ExperienceEntry entry={{ ...entry, link: undefined, note: undefined }} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByText("Any note.")).not.toBeInTheDocument();
  });

  it("has no PT-BR literal in the source", () => {
    const source = readFileSync(join(process.cwd(), "src/components/ExperienceEntry.tsx"), "utf8");
    expect(source).not.toMatch(/>\s*[A-Za-zÀ-ÿ][^<{]*</);
  });
});
