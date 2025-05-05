import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../styles/globalTheme.css";

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
  backgroundColor: vars.colors.rgba.shimmer.light,
  transform: "skewX(-20deg)",
  boxShadow: `0 0 30px 30px ${vars.colors.rgba.shimmer.dark}`,
});

export { shimmerWrapper, shimmer };
