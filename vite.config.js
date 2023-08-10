import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

const prodApi = "https://api.visitour.ph";
const stagingApi = "https://dev.api.visitour.ph";

// Set to true if build is for production
const isProd = false;

export default defineConfig({
  plugins: [react()],
  define: {
    appUrl: JSON.stringify(isProd ? prodApi : stagingApi),
  },
});