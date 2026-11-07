import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useMobileMenu } from "@/viewmodels/use-mobile-menu";

function pressKey(key: string) {
  document.dispatchEvent(new KeyboardEvent("keydown", { key }));
}

describe("useMobileMenu", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts closed", () => {
    const { result } = renderHook(() => useMobileMenu());
    expect(result.current.isOpen).toBe(false);
  });

  it("opens on first toggle and closes on second toggle", () => {
    const { result } = renderHook(() => useMobileMenu());
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });

  it("close() closes an open menu", () => {
    const { result } = renderHook(() => useMobileMenu());
    act(() => result.current.toggle());
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it("closes on Escape while open", () => {
    const { result } = renderHook(() => useMobileMenu());
    act(() => result.current.toggle());
    act(() => pressKey("Escape"));
    expect(result.current.isOpen).toBe(false);
  });

  it("does nothing on Escape while closed", () => {
    const { result } = renderHook(() => useMobileMenu());
    act(() => pressKey("Escape"));
    expect(result.current.isOpen).toBe(false);
  });

  it("keeps no keydown listener after close and after unmount", () => {
    const add = vi.spyOn(document, "addEventListener");
    const remove = vi.spyOn(document, "removeEventListener");
    const keydownCalls = (spy: typeof add) =>
      spy.mock.calls.filter(([type]) => type === "keydown").length;

    const { result, unmount } = renderHook(() => useMobileMenu());
    expect(keydownCalls(add)).toBe(0);

    act(() => result.current.toggle());
    expect(keydownCalls(add)).toBe(1);
    act(() => result.current.close());
    expect(keydownCalls(remove)).toBe(1);

    act(() => result.current.toggle());
    expect(keydownCalls(add)).toBe(2);
    unmount();
    expect(keydownCalls(remove)).toBe(2);
  });
});
