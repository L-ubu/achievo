import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { ACHIEVEMENTS } from "../data/achievements";
import { createElement } from "react";

export interface CompletionEntry {
  completed: boolean;
  timestamp: number | null;
}

export type PlayerState = Record<string, CompletionEntry>;

export interface AppState {
  luca: PlayerState;
  steen: PlayerState;
  lastSynced: number | null;
}

type Player = "luca" | "steen";

function emptyPlayerState(): PlayerState {
  const state: PlayerState = {};
  for (const a of ACHIEVEMENTS) {
    state[a.id] = { completed: false, timestamp: null };
  }
  return state;
}

function defaultState(): AppState {
  return { luca: emptyPlayerState(), steen: emptyPlayerState(), lastSynced: null };
}

const STORAGE_KEY = "achievo-state";

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as AppState;
    // Ensure all achievement IDs exist (forward compat)
    const base = defaultState();
    for (const player of ["luca", "steen"] as Player[]) {
      for (const id of Object.keys(base[player])) {
        if (!parsed[player][id]) {
          parsed[player][id] = { completed: false, timestamp: null };
        }
      }
    }
    return parsed;
  } catch {
    return defaultState();
  }
}

function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

interface GameStateContextValue {
  state: AppState;
  toggle: (player: Player, achievementId: string) => void;
  mergeState: (incoming: AppState) => void;
  resetAll: () => void;
  getPlayerCount: (player: Player) => { done: number; total: number };
  getPlayerCategoryCount: (player: Player, category: string) => { done: number; total: number };
  isAllTarotDone: (player: Player) => boolean;
}

const GameStateContext = createContext<GameStateContextValue | null>(null);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const toggle = useCallback((player: Player, achievementId: string) => {
    setState(prev => {
      const entry = prev[player][achievementId];
      if (!entry) return prev;
      const newCompleted = !entry.completed;
      return {
        ...prev,
        [player]: {
          ...prev[player],
          [achievementId]: {
            completed: newCompleted,
            timestamp: newCompleted ? Date.now() : null,
          },
        },
      };
    });
  }, []);

  const mergeState = useCallback((incoming: AppState) => {
    setState(prev => {
      const merged = { ...prev, lastSynced: Date.now() };
      for (const player of ["luca", "steen"] as Player[]) {
        merged[player] = { ...prev[player] };
        for (const id of Object.keys(incoming[player] ?? {})) {
          const local = prev[player]?.[id];
          const remote = incoming[player][id];
          if (!remote) continue;
          // If remote is completed and local isn't, or remote has newer timestamp
          if (remote.completed && (!local?.completed || (remote.timestamp ?? 0) > (local?.timestamp ?? 0))) {
            merged[player][id] = { ...remote };
          }
        }
      }
      return merged;
    });
  }, []);

  const resetAll = useCallback(() => {
    setState(defaultState());
  }, []);

  const getPlayerCount = useCallback((player: Player) => {
    const entries = Object.values(state[player]);
    return { done: entries.filter(e => e.completed).length, total: entries.length };
  }, [state]);

  const getPlayerCategoryCount = useCallback((player: Player, category: string) => {
    const ids = ACHIEVEMENTS.filter(a => a.category === category).map(a => a.id);
    const entries = ids.map(id => state[player][id]).filter(Boolean);
    return { done: entries.filter(e => e.completed).length, total: entries.length };
  }, [state]);

  const isAllTarotDone = useCallback((player: Player) => {
    const tarotIds = ACHIEVEMENTS.filter(a => a.category === "tarot").map(a => a.id);
    return tarotIds.every(id => state[player][id]?.completed);
  }, [state]);

  const value: GameStateContextValue = {
    state, toggle, mergeState, resetAll,
    getPlayerCount, getPlayerCategoryCount, isAllTarotDone,
  };

  return createElement(GameStateContext.Provider, { value }, children);
}

export function useGameState() {
  const ctx = useContext(GameStateContext);
  if (!ctx) throw new Error("useGameState must be used within GameStateProvider");
  return ctx;
}
