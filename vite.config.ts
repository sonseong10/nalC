import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";


export default defineConfig({
  plugins: [vanillaExtractPlugin(), react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  },
  server: {
    proxy: {
      "/api/map-reversegeocode": {
        target: "https://naveropenapi.apigw.ntruss.com",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/map-reversegeocode/,
            "/map-reversegeocode/v2/gc"
          ),
        secure: false,
        ws: true,
      },
    },
  },
});
