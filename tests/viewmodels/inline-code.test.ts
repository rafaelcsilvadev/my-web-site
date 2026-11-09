import { describe, expect, it } from "vitest";
import { splitInlineCode } from "@/viewmodels/inline-code";

describe("splitInlineCode", () => {
  it("returns one non-code segment for text without backticks", () => {
    expect(splitInlineCode("Plain text")).toEqual([
      { text: "Plain text", code: false },
    ]);
  });

  it("splits a backtick-marked path into three segments", () => {
    expect(
      splitInlineCode(
        "Todo texto em um só lugar, em `src/content/`. Nenhum texto fixo nos componentes.",
      ),
    ).toEqual([
      { text: "Todo texto em um só lugar, em ", code: false },
      { text: "src/content/", code: true },
      { text: ". Nenhum texto fixo nos componentes.", code: false },
    ]);
  });

  it("keeps an unmatched backtick as literal text", () => {
    expect(splitInlineCode("open `src/content")).toEqual([
      { text: "open `src/content", code: false },
    ]);
  });

  it("returns an empty list for empty text", () => {
    expect(splitInlineCode("")).toEqual([]);
  });
});
