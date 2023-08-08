import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

const prodApi = "https://api.visitour.ph";
const stagingApi = "https://dev.api.visitour.ph";

const config = {
  plugins: [react()],
  define: {
    appUrl: JSON.stringify(prodApi),
  },
};

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return { ...config, define: { appUrl: JSON.stringify(stagingApi) } };
  } else {
    // command === 'build'
    return { ...config };
  }
});
