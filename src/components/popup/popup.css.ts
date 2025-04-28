import { style } from "@vanilla-extract/css";

const popup = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  display: "block",
  padding: 0,
  width: "calc(520px - 40px)",
  backgroundColor: "#fff",
  border: "none",
  boxShadow: "4px 4px 16px rgba(0,0,0,0.4)",
  zIndex: 100,
  transform: "translate3d(-50%, -50%, 0)",
});

const popupHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #ddd",
  padding: "8px 10px",
});

const popupTitle = style({
  margin: 0,
});

export { popup, popupHeader, popupTitle };
