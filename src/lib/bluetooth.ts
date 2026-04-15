const SERVICE_UUID = 0xffe0;
const CHARACTERISTIC_UUID = 0xffe1;

export function isBluetoothSupported(): boolean {
  return typeof navigator !== "undefined" && "bluetooth" in navigator;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getBluetooth(): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bt = (navigator as any).bluetooth;
  if (!bt) throw new Error("Bluetooth not available");
  return bt;
}

async function getCharacteristic() {
  const bt = getBluetooth();
  const device = await bt.requestDevice({
    filters: [{ services: [SERVICE_UUID] }],
  });
  if (!device.gatt) throw new Error("GATT not available");
  const server = await device.gatt.connect();
  const service = await server.getPrimaryService(SERVICE_UUID);
  const char = await service.getCharacteristic(CHARACTERISTIC_UUID);
  return { char, server };
}

export async function bluetoothSend(data: string): Promise<void> {
  const { char, server } = await getCharacteristic();
  try {
    const bytes = new TextEncoder().encode(data);
    const CHUNK = 512;
    for (let i = 0; i < bytes.length; i += CHUNK) {
      await char.writeValue(bytes.slice(i, i + CHUNK));
    }
  } finally {
    server.disconnect();
  }
}

export async function bluetoothReceive(): Promise<string> {
  const { char, server } = await getCharacteristic();
  try {
    const value = await char.readValue();
    return new TextDecoder().decode(value);
  } finally {
    server.disconnect();
  }
}
