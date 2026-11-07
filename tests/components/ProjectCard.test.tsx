import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProjectCard } from "@/components/ProjectCard";
import { homeContent } from "@/content/home";

const [avaria, trello] = homeContent.projects.items;

afterEach(cleanup);

describe("ProjectCard", () => {
  it("renders the context, h3 title and description", () => {
    render(<ProjectCard project={avaria} />);
    expect(screen.getByText("Trabalho · Mobs2")).toBeInTheDocument();
    expect(screen.getByText("App + API")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Avaria");
    expect(screen.getByText(avaria.description)).toBeInTheDocument();
  });

  it("renders the card inside an article", () => {
    render(<ProjectCard project={avaria} />);
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("renders every metric label and value", () => {
    render(<ProjectCard project={trello} />);
    for (const { label, value } of trello.metrics) {
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getByText(value)).toBeInTheDocument();
    }
  });

  it("renders every tag", () => {
    render(<ProjectCard project={avaria} />);
    for (const tag of avaria.tags) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });

  it("links Ver o caso to the card caseLink href", () => {
    render(<ProjectCard project={trello} />);
    expect(screen.getByRole("link", { name: /Ver o caso/ })).toHaveAttribute(
      "href",
      "/casos/my-trello-version",
    );
  });

  it("opens the repo link in a new tab with noopener noreferrer", () => {
    render(<ProjectCard project={trello} />);
    const repo = screen.getByRole("link", { name: "Repositório no GitHub" });
    expect(repo).toHaveAttribute("href", "https://github.com/rafaelcsilvadev/my-trello-version");
    expect(repo).toHaveAttribute("target", "_blank");
    expect(repo).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders no repo link without repoLink", () => {
    render(<ProjectCard project={avaria} />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("renders no metrics container when metrics is empty", () => {
    const { container } = render(<ProjectCard project={{ ...avaria, metrics: [] }} />);
    expect(container.querySelector("dl")).toBeNull();
    expect(screen.queryByText("+4 anos")).not.toBeInTheDocument();
  });

  it("renders no tags container when tags is empty", () => {
    const { container } = render(<ProjectCard project={{ ...avaria, tags: [] }} />);
    expect(container.querySelector("ul")).toBeNull();
    expect(screen.queryByText("TypeScript")).not.toBeInTheDocument();
  });
});
