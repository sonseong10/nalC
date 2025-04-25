import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  console.log("VITE_APP_WEATHER_KEY:", env.VITE_APP_WEATHER_KEY);
  console.log("VITE_APP_NODE_ENV:", env.VITE_APP_NODE_ENV);

  return {
    base: "/nalC/",
    plugins: [vanillaExtractPlugin(), react()],
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_ENV),
      "process.env.NODE_ENV": JSON.stringify(mode),
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
  };
});
