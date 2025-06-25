import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  // Deploy to subdirectory of your custom domain
  base: mode === "production" ? "/portofolio-xp/" : "/",
  
  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
}));
