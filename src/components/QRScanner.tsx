import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { decompressState } from "../lib/sync";
import { useGameState } from "../hooks/useGameState";

interface QRScannerProps {
  onSynced: () => void;
}

export function QRScanner({ onSynced }: QRScannerProps) {
  const { mergeState } = useGameState();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          const incoming = decompressState(decodedText);
          if (incoming) {
            mergeState(incoming);
            setSuccess(true);
            scanner.stop().catch(() => {});
            navigator.vibrate?.(50);
            setTimeout(onSynced, 1500);
          } else {
            setError("Invalid QR code");
          }
        },
        () => {} // ignore per-frame scan misses
      )
      .catch(() => {
        setError("Could not access camera");
      });

    return () => {
      scanner.stop().catch(() => {});
    };
  }, [mergeState, onSynced]);

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-2">{"\u2713"}</div>
        <p className="text-gold font-heading">Synced!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        id="qr-reader"
        className="w-full max-w-[280px] rounded-xl overflow-hidden"
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <p className="text-xs text-stone text-center">
        Point your camera at the other device's QR code
      </p>
    </div>
  );
}
