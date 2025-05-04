import { style } from "@vanilla-extract/css";

const blind = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.4)",
  cursor: "pointer",
  zIndex: 10,
});

export { blind };
