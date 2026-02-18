export type LogMode = "raw" | "state-detection";

declare global {
  interface Window {
    TLT?: {
      initLib: (appKey: string, wsCollectorUrl: string) => void;
      registerBridgeCallbacks: (callbacks: unknown[]) => void;
    };
  }
}
