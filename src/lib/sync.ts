import lzString from "lz-string";
import type { AppState } from "../hooks/useGameState";

export function compressState(state: AppState): string {
  const json = JSON.stringify(state);
  return lzString.compressToEncodedURIComponent(json);
}

export function decompressState(compressed: string): AppState | null {
  try {
    const json = lzString.decompressFromEncodedURIComponent(compressed);
    if (!json) return null;
    return JSON.parse(json) as AppState;
  } catch {
    return null;
  }
}
