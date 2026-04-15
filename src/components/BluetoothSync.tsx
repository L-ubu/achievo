import { useState } from "react";
import { useGameState } from "../hooks/useGameState";
import { compressState, decompressState } from "../lib/sync";
import { bluetoothSend, bluetoothReceive, isBluetoothSupported } from "../lib/bluetooth";

export function BluetoothSync() {
  const { state, mergeState } = useGameState();
  const [status, setStatus] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [receiving, setReceiving] = useState(false);
  const supported = isBluetoothSupported();

  const handleSend = async () => {
    setSending(true);
    setStatus("Connecting...");
    try {
      const compressed = compressState(state);
      await bluetoothSend(compressed);
      setStatus("Sent!");
      navigator.vibrate?.(50);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Send failed");
    } finally {
      setSending(false);
    }
  };

  const handleReceive = async () => {
    setReceiving(true);
    setStatus("Waiting for data...");
    try {
      const data = await bluetoothReceive();
      const incoming = decompressState(data);
      if (incoming) {
        mergeState(incoming);
        setStatus("Synced!");
        navigator.vibrate?.(50);
      } else {
        setStatus("Invalid data received");
      }
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Receive failed");
    } finally {
      setReceiving(false);
    }
  };

  if (!supported) {
    return (
      <div className="text-center py-6">
        <p className="text-stone text-sm">
          Web Bluetooth is not supported on this device.
        </p>
        <p className="text-stone/50 text-xs mt-2">
          Try using Chrome on Android or desktop.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-3 w-full">
        <button
          onClick={handleSend}
          disabled={sending || receiving}
          className="flex-1 py-3 rounded-lg bg-gold/20 text-gold border border-gold/30 font-medium text-sm disabled:opacity-40 transition-opacity"
        >
          {sending ? "Sending..." : "Send"}
        </button>
        <button
          onClick={handleReceive}
          disabled={sending || receiving}
          className="flex-1 py-3 rounded-lg bg-gold/20 text-gold border border-gold/30 font-medium text-sm disabled:opacity-40 transition-opacity"
        >
          {receiving ? "Receiving..." : "Receive"}
        </button>
      </div>
      {status && (
        <p className="text-xs text-stone text-center">{status}</p>
      )}
      <p className="text-[10px] text-stone/40 text-center">
        Experimental — requires Chrome on Android or desktop
      </p>
    </div>
  );
}
