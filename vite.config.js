import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

const localUrl = "https://dev.api.visitour.ph";
const mode = "dev"; // prod or dev
export default defineConfig({
  plugins: [react()],
  define: {
    appUrl: JSON.stringify(
      mode == "dev" ? localUrl : "https://api.visitour.ph"
    ),
  },
});
