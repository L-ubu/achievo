import { useState } from "react";
import { useGameState } from "../hooks/useGameState";
import { QRGenerator } from "./QRGenerator";
import { QRScanner } from "./QRScanner";
import { BluetoothSync } from "./BluetoothSync";

type Tab = "qr" | "bluetooth";
type QRMode = "show" | "scan";

interface SyncPanelProps {
  onClose: () => void;
}

export function SyncPanel({ onClose }: SyncPanelProps) {
  const { state } = useGameState();
  const [tab, setTab] = useState<Tab>("qr");
  const [qrMode, setQrMode] = useState<QRMode>("show");

  const lastSynced = state.lastSynced
    ? new Date(state.lastSynced).toLocaleString()
    : "Never";

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="slide-up absolute bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl border-t bg-void border-void-border light:bg-parchment light:border-parchment-border overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-stone/30" />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-void-border light:border-parchment-border mx-4">
          <button
            onClick={() => setTab("qr")}
            className={`flex-1 pb-2 text-sm font-medium transition-colors ${
              tab === "qr" ? "text-gold border-b-2 border-gold" : "text-stone"
            }`}
          >
            QR Code
          </button>
          <button
            onClick={() => setTab("bluetooth")}
            className={`flex-1 pb-2 text-sm font-medium transition-colors ${
              tab === "bluetooth" ? "text-gold border-b-2 border-gold" : "text-stone"
            }`}
          >
            Bluetooth
            <span className="ml-1 text-[10px] px-1 py-0.5 rounded bg-stone/20 text-stone align-middle">
              beta
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {tab === "qr" && (
            <div>
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setQrMode("show")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    qrMode === "show"
                      ? "bg-gold/20 text-gold border border-gold/30"
                      : "bg-void-card light:bg-parchment-card text-stone border border-void-border light:border-parchment-border"
                  }`}
                >
                  Show QR
                </button>
                <button
                  onClick={() => setQrMode("scan")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    qrMode === "scan"
                      ? "bg-gold/20 text-gold border border-gold/30"
                      : "bg-void-card light:bg-parchment-card text-stone border border-void-border light:border-parchment-border"
                  }`}
                >
                  Scan QR
                </button>
              </div>
              {qrMode === "show" ? <QRGenerator /> : <QRScanner onSynced={onClose} />}
            </div>
          )}
          {tab === "bluetooth" && <BluetoothSync />}
        </div>

        {/* Footer */}
        <div className="px-4 pb-6 flex flex-col items-center gap-2">
          <p className="text-[10px] text-stone/40">Last synced: {lastSynced}</p>
          <button
            onClick={onClose}
            className="text-sm text-stone hover:text-gold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
