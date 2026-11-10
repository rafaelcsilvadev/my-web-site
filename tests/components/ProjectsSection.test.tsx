import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProjectsSection } from "@/components/ProjectsSection";
import { homeContent } from "@/content/home";

afterEach(cleanup);

describe("ProjectsSection", () => {
  it("renders a region named by its h2, with id projetos and scroll-mt-24", () => {
    render(<ProjectsSection projects={homeContent.projects} />);
    const region = screen.getByRole("region", { name: "Projetos em destaque" });
    expect(region).toHaveAttribute("id", "projetos");
    expect(region).toHaveClass("scroll-mt-24");
  });

  it("renders the eyebrow label and a single h2 title", () => {
    render(<ProjectsSection projects={homeContent.projects} />);
    expect(screen.getByText("Destaques")).toBeInTheDocument();
    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s).toHaveLength(1);
    expect(h2s[0]).toHaveTextContent("Projetos em destaque");
  });

  it("renders three h3 cards: Avaria, My Trello Version, Este site", () => {
    render(<ProjectsSection projects={homeContent.projects} />);
    const h3s = screen.getAllByRole("heading", { level: 3 });
    expect(h3s.map((h) => h.textContent)).toEqual(["Avaria", "My Trello Version", "Este site"]);
  });

  it("renders one article per project", () => {
    render(<ProjectsSection projects={homeContent.projects} />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("makes only the last card span both columns from md", () => {
    render(<ProjectsSection projects={homeContent.projects} />);
    const [avaria, trello, site] = screen.getAllByRole("article");
    expect(site).toHaveClass("md:col-span-2");
    expect(avaria).not.toHaveClass("md:col-span-2");
    expect(trello).not.toHaveClass("md:col-span-2");
  });
});
