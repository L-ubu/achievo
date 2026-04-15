import { useRef, useCallback, useState } from "react";
import { useGameState } from "../hooks/useGameState";
import type { Achievement } from "../data/achievements";

type Player = "luca" | "steen";

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

function spawnParticles(container: HTMLElement) {
  const count = 10;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const dist = 20 + Math.random() * 15;
    const p = document.createElement("div");
    p.className = "particle";
    p.style.setProperty("--px", `${Math.cos(angle) * dist}px`);
    p.style.setProperty("--py", `${Math.sin(angle) * dist}px`);
    p.style.left = "50%";
    p.style.top = "50%";
    container.appendChild(p);
    setTimeout(() => p.remove(), 500);
  }
}

export function AchievementCard({ achievement, index }: AchievementCardProps) {
  const { state, toggle } = useGameState();
  const cardRef = useRef<HTMLDivElement>(null);
  const [shimmer, setShimmer] = useState(false);

  const lucaDone = state.luca[achievement.id]?.completed ?? false;
  const steenDone = state.steen[achievement.id]?.completed ?? false;
  const anyDone = lucaDone || steenDone;

  const handleToggle = useCallback((player: Player, btnEl: HTMLElement) => {
    const wasComplete = state[player][achievement.id]?.completed;
    toggle(player, achievement.id);

    if (!wasComplete) {
      navigator.vibrate?.(10);
      spawnParticles(btnEl);
      setShimmer(true);
      setTimeout(() => setShimmer(false), 600);
    }
  }, [state, toggle, achievement.id]);

  return (
    <div
      ref={cardRef}
      className={`card-stagger relative rounded-lg border p-3 transition-colors duration-200 ${
        anyDone
          ? "border-gold/30 bg-void-card light:bg-parchment-card"
          : "border-void-border bg-void-card light:border-parchment-border light:bg-parchment-card"
      } ${shimmer ? "shimmer-active" : ""}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0 mt-0.5">{achievement.emoji}</span>
        <div className="flex-1 min-w-0">
          <h3 className={`font-heading text-sm tracking-wide ${anyDone ? "text-gold" : "text-white light:text-ink"}`}>
            {achievement.name}
          </h3>
          <p className="text-xs text-white/50 light:text-ink/50 mt-0.5 leading-relaxed">
            {achievement.description}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <ToggleButton
            label="L"
            done={lucaDone}
            onToggle={(el) => handleToggle("luca", el)}
          />
          <ToggleButton
            label="S"
            done={steenDone}
            onToggle={(el) => handleToggle("steen", el)}
          />
        </div>
      </div>
    </div>
  );
}

function ToggleButton({ label, done, onToggle }: { label: string; done: boolean; onToggle: (el: HTMLElement) => void }) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (ref.current) {
      ref.current.classList.add("toggle-press");
      setTimeout(() => ref.current?.classList.remove("toggle-press"), 200);
      onToggle(ref.current);
    }
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={`relative w-8 h-8 rounded-full border-2 text-xs font-bold transition-all duration-200 ${
        done
          ? "border-gold bg-gold/20 text-gold shadow-[0_0_8px_var(--color-gold-dim)]"
          : "border-stone/30 text-stone/50 hover:border-stone/60"
      }`}
      aria-label={`${label} toggle`}
    >
      {done ? "\u2713" : label}
    </button>
  );
}
