export type LogMode = "raw" | "state-detection";

declare global {
  interface Window {
    TLT?: {
      registerBridgeCallbacks: (callbacks: unknown[]) => void;
    };
  }
}
