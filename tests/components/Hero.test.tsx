import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Hero } from "@/components/Hero";
import { homeContent } from "@/content/home";

const { hero } = homeContent;

afterEach(cleanup);

describe("Hero", () => {
  it("renders exactly one h1 with the headline", () => {
    render(<Hero hero={hero} />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Especialista Full Stack do requisito à produção");
  });

  it("renders the label, badge, intro and stack line", () => {
    render(<Hero hero={hero} />);
    expect(screen.getByText("Desenvolvedor de software")).toBeInTheDocument();
    expect(screen.getByText("SDD")).toBeInTheDocument();
    expect(
      screen.getByText("Especialista em desenvolvimento guiado por especificações"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Construo software de ponta a ponta, do requisito à produção, guiado por especificações.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("TypeScript · React · Node")).toBeInTheDocument();
  });

  it("links Contato to #contato", () => {
    render(<Hero hero={hero} />);
    expect(screen.getByRole("link", { name: "Contato" })).toHaveAttribute("href", "#contato");
  });

  it("links Baixar CV to the PDF with the download attribute", () => {
    render(<Hero hero={hero} />);
    const cv = screen.getByRole("link", { name: "Baixar CV" });
    expect(cv).toHaveAttribute("href", "/cv-rafael-couto-silva.pdf");
    expect(cv).toHaveAttribute("download");
  });

  it("renders the portrait with alt, width and height", () => {
    render(<Hero hero={hero} />);
    const img = screen.getByRole("img", {
      name: "Retrato profissional de Rafael Couto Silva em um setup roxo",
    });
    expect(img).toHaveAttribute("width", "1254");
    expect(img).toHaveAttribute("height", "1254");
  });

  it("serves the portrait with priority since it is the LCP element", () => {
    render(<Hero hero={hero} />);
    const img = screen.getByRole("img", {
      name: "Retrato profissional de Rafael Couto Silva em um setup roxo",
    });
    expect(img).not.toHaveAttribute("loading", "lazy");
  });

  it("names the hero section by its h1", () => {
    render(<Hero hero={hero} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.id).not.toBe("");
    expect(screen.getByRole("region", { name: h1.textContent ?? "" })).toHaveAttribute(
      "aria-labelledby",
      h1.id,
    );
  });

  it("renders the portrait caption in a figcaption", () => {
    render(<Hero hero={hero} />);
    const caption = screen.getByText("Retrato criado com IA a partir de uma foto minha");
    expect(caption.tagName).toBe("FIGCAPTION");
  });
});
