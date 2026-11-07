import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ExperienceSection } from "@/components/ExperienceSection";
import { homeContent } from "@/content/home";

afterEach(cleanup);

describe("ExperienceSection", () => {
  it("renders a region named by its h2, with id experiencia and scroll-mt-24", () => {
    render(<ExperienceSection experience={homeContent.experience} />);
    const region = screen.getByRole("region", { name: "Onde construí" });
    expect(region).toHaveAttribute("id", "experiencia");
    expect(region).toHaveClass("scroll-mt-24");
  });

  it("renders the eyebrow label and a single h2 title", () => {
    render(<ExperienceSection experience={homeContent.experience} />);
    expect(screen.getByText("Experiência")).toBeInTheDocument();
    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s).toHaveLength(1);
    expect(h2s[0]).toHaveTextContent("Onde construí");
  });

  it("renders three h3 entries in order: Mobs2, Duo Technology, Globals · Missão Crítica", () => {
    render(<ExperienceSection experience={homeContent.experience} />);
    const h3s = screen.getAllByRole("heading", { level: 3 });
    expect(h3s.map((h) => h.textContent)).toEqual([
      "Mobs2",
      "Duo Technology",
      "Globals · Missão Crítica",
    ]);
  });

  it("holds no PT-BR literal in its source", () => {
    const source = readFileSync(join(process.cwd(), "src/components/ExperienceSection.tsx"), "utf8");
    expect(source).not.toMatch(/>\s*[A-Za-zÀ-ÿ][^<{]*</);
  });
});
