import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log(`This application is running in ${env.APP_ENV} environment!`);

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: +env.VITE_PORT,
    },
    
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },

  };
});
