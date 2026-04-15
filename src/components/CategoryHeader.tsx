import { useGameState } from "../hooks/useGameState";

interface CategoryHeaderProps {
  category: string;
  label: string;
}

export function CategoryHeader({ category, label }: CategoryHeaderProps) {
  const { getPlayerCategoryCount } = useGameState();
  const luca = getPlayerCategoryCount("luca", category);
  const steen = getPlayerCategoryCount("steen", category);

  return (
    <div className="mt-8 mb-4 first:mt-0">
      <h2 className="font-heading text-lg text-gold tracking-wider">{label}</h2>
      <div className="flex gap-4 text-xs text-white/60 light:text-stone mt-1">
        <span>L: {luca.done}/{luca.total}</span>
        <span>S: {steen.done}/{steen.total}</span>
      </div>
      <div className="h-px bg-void-border light:bg-parchment-border mt-2" />
    </div>
  );
}
