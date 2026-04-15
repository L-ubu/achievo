import { GENERAL_ACHIEVEMENTS, TAROT_ACHIEVEMENTS, AI_ACHIEVEMENTS } from "../data/achievements";
import { CategoryHeader } from "./CategoryHeader";
import { AchievementCard } from "./AchievementCard";
import { TarotGod } from "./TarotGod";

export function AchievementList() {
  let idx = 0;
  return (
    <div>
      <CategoryHeader category="general" label="General Quest Log" />
      <div className="flex flex-col gap-2">
        {GENERAL_ACHIEVEMENTS.map((a) => (
          <AchievementCard key={a.id} achievement={a} index={idx++} />
        ))}
      </div>

      <CategoryHeader category="tarot" label="Tarot Trials" />
      <div className="flex flex-col gap-2">
        {TAROT_ACHIEVEMENTS.map((a) => (
          <AchievementCard key={a.id} achievement={a} index={idx++} />
        ))}
      </div>

      <TarotGod />

      <CategoryHeader category="ai" label="AI Experiments" />
      <div className="flex flex-col gap-2">
        {AI_ACHIEVEMENTS.map((a) => (
          <AchievementCard key={a.id} achievement={a} index={idx++} />
        ))}
      </div>
    </div>
  );
}
