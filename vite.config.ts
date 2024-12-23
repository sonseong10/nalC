import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
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
