import { useGameState } from "../hooks/useGameState";
import { ProgressBar } from "./ProgressBar";

interface HeaderProps {
  light: boolean;
  onToggleTheme: () => void;
}

export function Header({ light, onToggleTheme }: HeaderProps) {
  const { getPlayerCount } = useGameState();
  const luca = getPlayerCount("luca");
  const steen = getPlayerCount("steen");

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md border-b bg-void/80 border-void-border light:bg-parchment/80 light:border-parchment-border">
      <div className="max-w-lg mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-heading text-2xl text-gold tracking-wide">Achievo</h1>
          <button
            onClick={onToggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full text-white/60 light:text-stone hover:text-gold transition-colors text-lg"
            aria-label="Toggle theme"
          >
            {light ? "\u263E" : "\u2600"}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <ProgressBar label="Luca" done={luca.done} total={luca.total} />
          <ProgressBar label="Steen" done={steen.done} total={steen.total} />
        </div>
      </div>
    </header>
  );
}
