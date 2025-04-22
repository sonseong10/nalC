import { style } from "@vanilla-extract/css";
import SVG from "../../styles/icon";

const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "4px 8px",
  height: "60px",
  maxWidth: "520px",
  margin: "0 auto",
  backgroundColor: "#fff",
  borderBottom: "1px solid #ddd",
});

const logo = style({
  margin: 0,
  fontSize: "24px",
  background: "url('../../../public/favicon.svg') no-repeat center center",
  color: "transparent",
  userSelect: "none",
});

const searchButton = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  padding: "0 10px 0 36px",
  height: "36px",
  backgroundColor: "#0066ff",
  border: "none",
  borderRadius: "8px",
  color: "#fff",
  cursor: "pointer",
  boxSizing: "border-box",

  selectors: {
    "&:hover": {
      opacity: 0.7,
    },

    "&:before": {
      position: "absolute",
      top: 0,
      left: "2px",
      display: "block",
      width: "36px",
      height: "36px",
      background: `url(${SVG.Map("#fff")}) no-repeat center center`,
      backgroundSize: "18px 18px",
      content: "",
    },
  },
});

export { header, logo, searchButton };

