import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ContactSection } from "@/components/ContactSection";
import { homeContent } from "@/content/home";

afterEach(cleanup);

const WHATSAPP = "https://wa.me/5524999644346";

describe("ContactSection", () => {
  it("renders a region named by its h2, with id contato and scroll-mt-24", () => {
    render(<ContactSection contact={homeContent.contact} />);
    const region = screen.getByRole("region", { name: "Vamos conversar" });
    expect(region).toHaveAttribute("id", "contato");
    expect(region).toHaveClass("scroll-mt-24");
  });

  it("renders the eyebrow, a single h2 and the lead", () => {
    render(<ContactSection contact={homeContent.contact} />);
    expect(screen.getByText("Contato")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(1);
    expect(screen.getByText("Para vaga ou projeto, escolha o canal.")).toBeInTheDocument();
  });

  it("renders 'Baixar CV' with the PDF href and download attribute", () => {
    render(<ContactSection contact={homeContent.contact} />);
    const cv = screen.getByRole("link", { name: "Baixar CV" });
    expect(cv).toHaveAttribute("href", "/cv-rafael-couto-silva.pdf");
    expect(cv).toHaveAttribute("download");
  });

  it("opens the WhatsApp button externally with noopener noreferrer", () => {
    render(<ContactSection contact={homeContent.contact} />);
    const button = screen.getByRole("link", { name: "Chamar no WhatsApp" });
    expect(button).toHaveAttribute("href", WHATSAPP);
    expect(button).toHaveAttribute("target", "_blank");
    expect(button).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the WhatsApp card pointing to the same URL, external", () => {
    render(<ContactSection contact={homeContent.contact} />);
    const card = screen.getByRole("link", { name: /Abrir conversa/ });
    expect(card).toHaveAttribute("href", WHATSAPP);
    expect(card).toHaveAttribute("target", "_blank");
    expect(card).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the e-mail card as mailto with no target", () => {
    render(<ContactSection contact={homeContent.contact} />);
    const card = screen.getByRole("link", { name: /rafacsilva016@gmail\.com/ });
    expect(card).toHaveAttribute("href", "mailto:rafacsilva016@gmail.com");
    expect(card).not.toHaveAttribute("target");
  });

  it("renders the LinkedIn card as external", () => {
    render(<ContactSection contact={homeContent.contact} />);
    const card = screen.getByRole("link", { name: /linkedin\.com\/in\/rafa-couto/ });
    expect(card).toHaveAttribute("href", "https://linkedin.com/in/rafa-couto");
    expect(card).toHaveAttribute("target", "_blank");
    expect(card).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the GitHub card as external", () => {
    render(<ContactSection contact={homeContent.contact} />);
    const card = screen.getByRole("link", { name: /github\.com\/rafaelcsilvadev/ });
    expect(card).toHaveAttribute("href", "https://github.com/rafaelcsilvadev");
    expect(card).toHaveAttribute("target", "_blank");
    expect(card).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("never renders '[conferir' in the HTML", () => {
    const { container } = render(<ContactSection contact={homeContent.contact} />);
    expect(container.innerHTML).not.toContain("[conferir");
  });

  it("holds no PT-BR literal in its source", () => {
    const source = readFileSync(join(process.cwd(), "src/components/ContactSection.tsx"), "utf8");
    expect(source).not.toMatch(/>\s*[A-Za-zÀ-ÿ][^<{]*</);
  });
});
