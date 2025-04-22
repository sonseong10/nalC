import { style } from "@vanilla-extract/css";

const main = style({
  backgroundColor: "#ededed",
});

const container = style({
  display: "block",
  maxWidth: "520px",
  margin: "0 auto 10px",
  padding: "4px 8px",
  backgroundColor: "#fff",
});

const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "4px 8px",
  maxWidth: "520px",
  margin: "0 auto",
  backgroundColor: "#fff",
  borderBottom: "1px solid #ddd",
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

export { main, container, header, flexRow, footer };

