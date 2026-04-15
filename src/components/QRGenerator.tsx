import { QRCodeSVG } from "qrcode.react";
import { useGameState } from "../hooks/useGameState";
import { compressState } from "../lib/sync";

export function QRGenerator() {
  const { state } = useGameState();
  const compressed = compressState(state);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="scale-bounce bg-white p-4 rounded-xl">
        <QRCodeSVG value={compressed} size={220} level="L" />
      </div>
      <p className="text-xs text-stone text-center">
        Show this to the other device and scan it
      </p>
    </div>
  );
}
