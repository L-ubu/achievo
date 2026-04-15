import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { GameStateProvider } from "./hooks/useGameState";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameStateProvider>
      <App />
    </GameStateProvider>
  </StrictMode>
);
