import { describe, expect, it } from "vitest";
import { cases } from "@/content/cases";
import { findCase } from "@/viewmodels/case-view-model";

describe("findCase", () => {
  it("returns the entry for a known slug", () => {
    expect(findCase(cases, "avaria")?.slug).toBe("avaria");
    expect(findCase(cases, "my-trello-version")?.slug).toBe("my-trello-version");
  });

  it("returns undefined for an unknown slug", () => {
    expect(findCase(cases, "does-not-exist")).toBeUndefined();
  });

  it("returns undefined for an empty string", () => {
    expect(findCase(cases, "")).toBeUndefined();
  });

  it("returns undefined for a slug in a different case", () => {
    expect(findCase(cases, "AVARIA")).toBeUndefined();
  });
});
