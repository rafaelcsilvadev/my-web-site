import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const publicDir = join(process.cwd(), "public");

const expectedAssets = [
  "favicon-180.png",
  "favicon-192.png",
  "favicon-32.png",
  "favicon-512.png",
  "favicon.ico",
  "favicon.svg",
  "og-image.png",
  "rafael-portrait.png",
  "cv-rafael-couto-silva.pdf",
  "my-trello-version-board.png",
  "this-site-home.png",
];

describe("public assets", () => {
  it.each(expectedAssets)("includes %s", (file) => {
    expect(existsSync(join(publicDir, file))).toBe(true);
  });

  it("serves og-image.png as a 1200x630 PNG", () => {
    const bytes = readFileSync(join(publicDir, "og-image.png"));
    const signature = bytes.subarray(0, 8).toString("hex");
    expect(signature).toBe("89504e470d0a1a0a");
    expect(bytes.subarray(12, 16).toString("ascii")).toBe("IHDR");
    expect(bytes.readUInt32BE(16)).toBe(1200);
    expect(bytes.readUInt32BE(20)).toBe(630);
  });

  it("serves rafael-portrait.png as a 1254x1254 PNG", () => {
    const bytes = readFileSync(join(publicDir, "rafael-portrait.png"));
    const signature = bytes.subarray(0, 8).toString("hex");
    expect(signature).toBe("89504e470d0a1a0a");
    expect(bytes.subarray(12, 16).toString("ascii")).toBe("IHDR");
    expect(bytes.readUInt32BE(16)).toBe(1254);
    expect(bytes.readUInt32BE(20)).toBe(1254);
  });

  it("serves my-trello-version-board.png as a 1797x915 PNG", () => {
    const bytes = readFileSync(join(publicDir, "my-trello-version-board.png"));
    const signature = bytes.subarray(0, 8).toString("hex");
    expect(signature).toBe("89504e470d0a1a0a");
    expect(bytes.subarray(12, 16).toString("ascii")).toBe("IHDR");
    expect(bytes.readUInt32BE(16)).toBe(1797);
    expect(bytes.readUInt32BE(20)).toBe(915);
  });

  it("serves this-site-home.png as a 1679x1127 PNG", () => {
    const bytes = readFileSync(join(publicDir, "this-site-home.png"));
    const signature = bytes.subarray(0, 8).toString("hex");
    expect(signature).toBe("89504e470d0a1a0a");
    expect(bytes.subarray(12, 16).toString("ascii")).toBe("IHDR");
    expect(bytes.readUInt32BE(16)).toBe(1679);
    expect(bytes.readUInt32BE(20)).toBe(1127);
  });

  it("serves cv-rafael-couto-silva.pdf as a non-empty PDF", () => {
    const bytes = readFileSync(join(publicDir, "cv-rafael-couto-silva.pdf"));
    expect(bytes.length).toBeGreaterThan(0);
    expect(bytes.subarray(0, 4).toString("ascii")).toBe("%PDF");
  });

  it("contains no image besides the expected ones", () => {
    expect(readdirSync(publicDir).sort()).toEqual([...expectedAssets].sort());
  });
});
