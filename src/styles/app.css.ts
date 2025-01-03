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

export const inputBox = style({
  display: "block",
  border: "1px solid #e9e9e9",
  padding: "6px 58px 6px 8px",
  margin: 0,
  width: "320px",
  height: "46px",
});

export const searchBtn = style({
  position: "absolute",
  right: 0,
  border: 0,
  backgroundColor: "#0066ff",
  color: "#fff",
  padding: "6px 8px",
  width: "52px",
  height: "46px",
});