"use client";

import { useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "zmaga-favorite-models";
const CHANGE_EVENT = "zmaga-favorites-change";
const EMPTY_SNAPSHOT = "[]";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT;
}

function save(models: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useFavorites() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_SNAPSHOT);
  const favorites = useMemo<string[]>(() => {
    try {
      const value: unknown = JSON.parse(snapshot);
      return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
    } catch {
      return [];
    }
  }, [snapshot]);

  const toggleFavorite = (model: string) => {
    save(favorites.includes(model) ? favorites.filter((item) => item !== model) : [...favorites, model]);
  };

  return { favorites, toggleFavorite };
}
