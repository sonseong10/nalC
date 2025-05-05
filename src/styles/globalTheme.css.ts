import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  colors: {
    brand: {
      primary: "#feda39",
    },
    brightness: {
      black: "#000000",
      900: "#121212",
      800: "#262626",
      700: "#393939",
      600: "#4D4D4D",
      500: "#888888",
      400: "#B9B9B9",
      300: "#E0E0E0",
      200: "#F4F4F4",
      100: "#F8F8F8",
      white: "#FFFFFF",
    },
    yellow: {
      600: "#ea9000",
      500: "#f7b000",
      400: "#feda39",
      300: "#ffe361",
      200: "#fffca5",
      100: "#fefbbd",
    },
    red: {
      900: "#ff4949",
    },
    blue: {
      900: "#7a59f1",
      800: "#0661b1",
      700: "#45c1e0",
    },
    rgba: {
      primary: "rgba(0,0,0,0.4)",
      shimmer: {
        light: "rgba(255,255,255,0.2)",
        dark: "rgba(255,255,255,0.05)",
      },
    },
  },
  zIndex: {
    hidden: "-1",
    components: "5",
    header: "10",
    layer: "20",
    popup: "30",
  },
});
