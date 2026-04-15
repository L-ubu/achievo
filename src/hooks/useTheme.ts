import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "achievo-theme";

export function useTheme() {
  const [light, setLight] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    localStorage.setItem(STORAGE_KEY, light ? "light" : "dark");
    // Update theme-color meta tag
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", light ? "#f5f0e8" : "#0c0c0f");
  }, [light]);

  const toggle = useCallback(() => setLight(prev => !prev), []);

  return { light, toggle };
}
