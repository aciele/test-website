import { type ReactNode, useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { MuiInputs } from "./views/MuiInputs";
import { ShadcnInputs } from "./views/ShadcnInputs";
import { AntDesignInputs } from "./views/AntDesignInputs";
import { ChakraInputs } from "./views/ChakraInputs";
import {
  rawLogCallback,
  stateDetectionCallback,
} from "./utils/loggingCallbacks";
import { type LogMode } from "./utils/types";

const tabConfig: { label: string; path: string; element: ReactNode }[] = [
  { label: "Material UI", path: "/mui", element: <MuiInputs /> },
  { label: "shadcn/ui", path: "/shadcn", element: <ShadcnInputs /> },
  { label: "Ant Design", path: "/antd", element: <AntDesignInputs /> },
  { label: "Chakra UI", path: "/chakra", element: <ChakraInputs /> },
];

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [logMode, setLogMode] = useState<LogMode>(() => {
    return (localStorage.getItem("logMode") as LogMode) || "state-detection";
  });

  useEffect(() => {
    if (!window.TLT) return;

    // Disable both callbacks first
    rawLogCallback.enabled = false;
    stateDetectionCallback.enabled = false;

    // Enable the selected callback
    if (logMode === "raw") {
      rawLogCallback.enabled = true;
      window.TLT.registerBridgeCallbacks([rawLogCallback]);
    } else {
      stateDetectionCallback.enabled = true;
      window.TLT.registerBridgeCallbacks([stateDetectionCallback]);
    }

    // Also register the disabled callback to ensure it's in the system
    if (logMode === "raw") {
      window.TLT.registerBridgeCallbacks([stateDetectionCallback]);
    } else {
      window.TLT.registerBridgeCallbacks([rawLogCallback]);
    }

    localStorage.setItem("logMode", logMode);
  }, [logMode]);

  const toggleLogMode = () => {
    setLogMode((prev) => (prev === "raw" ? "state-detection" : "raw"));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>UI Libraries — Input Components Showcase</h1>
        <button
          onClick={toggleLogMode}
          style={{
            padding: "8px 16px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            background: logMode === "state-detection" ? "#e3f2fd" : "#fff3e0",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 500,
            color: "#333",
            transition: "all 0.2s",
          }}
          title="Toggle between raw message logs and state detection logs"
        >
          {logMode === "raw"
            ? "📋 Raw logs (Type 4 & 12)"
            : "🔍 Logs with state detection"}
        </button>
      </div>

      <nav
        style={{
          display: "flex",
          gap: "0",
          borderBottom: "2px solid #ddd",
          marginBottom: "30px",
        }}
      >
        {tabConfig.map(({ label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                padding: "10px 24px",
                border: "none",
                borderBottom: isActive
                  ? "3px solid #1976d2"
                  : "3px solid transparent",
                background: isActive ? "#f0f4ff" : "transparent",
                cursor: "pointer",
                fontWeight: isActive ? 600 : 400,
                fontSize: "15px",
                color: isActive ? "#1976d2" : "#555",
                transition: "all 0.2s",
              }}
            >
              {label}
            </button>
          );
        })}
      </nav>

      <Routes>
        {tabConfig.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={<Navigate to="/mui" replace />} />
      </Routes>
    </div>
  );
}

export default App;
