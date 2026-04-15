import { useEffect, useRef, useState } from "react";
import { useGameState } from "../hooks/useGameState";

export function TarotGod() {
  const { isAllTarotDone } = useGameState();
  const lucaDone = isAllTarotDone("luca");
  const steenDone = isAllTarotDone("steen");
  const anyGod = lucaDone || steenDone;
  const [justUnlocked, setJustUnlocked] = useState(false);
  const prevAnyGod = useRef(anyGod);

  useEffect(() => {
    if (anyGod && !prevAnyGod.current) {
      setJustUnlocked(true);

      // Gold flash overlay
      const overlay = document.createElement("div");
      overlay.style.cssText = "position:fixed;inset:0;z-index:100;pointer-events:none;background:var(--color-gold);opacity:0;";
      overlay.style.animation = "gold-flash 800ms ease forwards";
      document.body.appendChild(overlay);
      setTimeout(() => overlay.remove(), 800);

      // Gold rain particles
      for (let i = 0; i < 30; i++) {
        const p = document.createElement("div");
        p.style.cssText = `position:fixed;width:4px;height:12px;border-radius:2px;background:var(--color-gold);pointer-events:none;z-index:100;left:${Math.random() * 100}%;top:-12px;`;
        p.style.animation = `gold-rain ${1.5 + Math.random()}s ease-in forwards`;
        p.style.animationDelay = `${Math.random() * 0.5}s`;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 2500);
      }

      setTimeout(() => setJustUnlocked(false), 2000);
    }
    prevAnyGod.current = anyGod;
  }, [anyGod]);

  const players = [
    lucaDone && "Luca",
    steenDone && "Steen",
  ].filter(Boolean);

  return (
    <div
      className={`mt-6 mb-4 rounded-lg border-2 p-4 text-center transition-all duration-500 ${
        anyGod
          ? "border-gold bg-gold/5"
          : "border-void-border light:border-parchment-border bg-void-card/50 light:bg-parchment-card/50 opacity-40"
      } ${justUnlocked ? "animate-[god-shake_300ms_ease,god-reveal_800ms_300ms_ease_forwards]" : ""}`}
    >
      <div className="text-3xl mb-2">{anyGod ? "\uD83D\uDC51" : "\uD83D\uDD12"}</div>
      <h3 className={`font-heading text-lg tracking-wider ${anyGod ? "text-gold" : "text-stone"}`}>
        Tarot God
      </h3>
      <p className="text-xs text-stone/70 mt-1">
        {anyGod
          ? `${players.join(" & ")} completed all Tarot Trials`
          : "Complete all 20 Tarot achievements to unlock"}
      </p>
    </div>
  );
}
