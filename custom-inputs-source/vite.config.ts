import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // Use relative paths for build - works for both GitHub Pages and local Docker
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../custom-inputs",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Open browser at the correct path in dev mode
    open: "/custom-inputs",
  },
});
