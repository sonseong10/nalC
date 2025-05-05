import { style } from "@vanilla-extract/css";
import { vars } from "./globalTheme.css";

const main = style({
  minHeight: "100vh",
  backgroundColor: vars.colors.brightness[200],
});

const container = style({
  display: "block",
  maxWidth: "520px",
  margin: "0 auto 10px",
  padding: "4px 8px",
  backgroundColor: vars.colors.brightness.white,
  overflow: "hidden",
});

const flexRow = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
});

const footer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: "120px",
  maxWidth: "520px",
  backgroundColor: "#f4f6f8",
  fontSize: "14px",
});

export { main, container, flexRow, footer };

