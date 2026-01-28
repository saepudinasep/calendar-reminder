import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "@fullcalendar/react",
      "@fullcalendar/daygrid",
      "@fullcalendar/timegrid",
      "@fullcalendar/interaction",
    ],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://script.google.com",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            "/api",
            "/macros/s/AKfycbzHP9IfCyRnsst78kCYiQs_5TA1kT1Gjoqf53lIf8bASVBt5EB-wXCs93PSv4T0JjYK"
          ),
      },
    },
  },
});
