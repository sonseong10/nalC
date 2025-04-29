import { keyframes, style } from "@vanilla-extract/css";

const loading = keyframes({
  "0%": { transform: "translateX(-150%)" },
  "50%": { transform: "translateX(-60%)" },
  "100%": { transform: "translateX(150%)" },
});

const shimmerWrapper = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  animation: `${loading} 2.5s infinite`,
});

const shimmer = style({
  width: "50%",
  height: "100%",
  backgroundColor: "rgba(255,255,255,0.2)",
  transform: "skewX(-20deg)",
  boxShadow: "0 0 30px 30px rgba(255,255,255,0.05)",
});

export { shimmerWrapper, shimmer };
