import { useState } from "react";
import { useTheme } from "./hooks/useTheme";
import { Header } from "./components/Header";
import { AchievementList } from "./components/AchievementList";
import { SyncPanel } from "./components/SyncPanel";

export default function App() {
  const { light, toggle: toggleTheme } = useTheme();
  const [syncOpen, setSyncOpen] = useState(false);

  return (
    <div className="min-h-screen pb-24">
      <Header light={light} onToggleTheme={toggleTheme} />
      <main className="max-w-lg mx-auto px-4 pt-4">
        <AchievementList />
      </main>
      <button
        onClick={() => setSyncOpen(true)}
        className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-gold text-void font-bold text-2xl shadow-lg active:scale-90 transition-transform"
        aria-label="Sync"
      >
        &#x21bb;
      </button>
      {syncOpen && <SyncPanel onClose={() => setSyncOpen(false)} />}
    </div>
  );
}
