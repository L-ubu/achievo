import { useRef, useEffect } from "react";

interface ProgressBarProps {
  label: string;
  done: number;
  total: number;
}

export function ProgressBar({ label, done, total }: ProgressBarProps) {
  const pct = total > 0 ? (done / total) * 100 : 0;
  const barRef = useRef<HTMLDivElement>(null);
  const prevDone = useRef(done);

  useEffect(() => {
    if (done > prevDone.current && barRef.current) {
      barRef.current.classList.add("bar-pulse");
      const t = setTimeout(() => barRef.current?.classList.remove("bar-pulse"), 600);
      prevDone.current = done;
      return () => clearTimeout(t);
    }
    prevDone.current = done;
  }, [done]);

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-white/70 light:text-stone font-medium">{label}</span>
        <span className="text-gold-dim">{done}/{total}</span>
      </div>
      <div className="h-2 rounded-full bg-void-border light:bg-parchment-border overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full bg-gold transition-all duration-400 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
