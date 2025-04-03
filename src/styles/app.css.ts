import { style } from "@vanilla-extract/css";

export const container = style({
  display: "block",
  maxWidth: "520px",
  margin: "0 auto",
  padding: "4px 8px",
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "4px 8px",
  maxWidth: "520px",
  margin: "0 auto",
  borderBottom: "1px solid #ddd",
});

export const flexRow = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
});

