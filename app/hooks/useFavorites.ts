"use client";

import { useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "zmaga-favorite-models";
const CHANGE_EVENT = "zmaga-favorites-change";
const EMPTY_SNAPSHOT = "[]";
let memorySnapshot: string | null = null;

function subscribe(callback: () => void) {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;

    memorySnapshot = null;
    callback();
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot() {
  if (memorySnapshot !== null) return memorySnapshot;

  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT;
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

function save(models: string[]) {
  const nextSnapshot = JSON.stringify(models);

  try {
    window.localStorage.setItem(STORAGE_KEY, nextSnapshot);
    memorySnapshot = null;
  } catch {
    memorySnapshot = nextSnapshot;
  }

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
