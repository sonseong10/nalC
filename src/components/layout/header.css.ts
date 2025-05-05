import { style } from "@vanilla-extract/css";
import SVG from "../../styles/icon";
import { vars } from "../../styles/globalTheme.css";

const header = style({
  position: "fixed",
  left: "50%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "4px 8px",
  height: "60px",
  width: "100vw",
  margin: "0 auto",
  backgroundColor: vars.colors.brightness.white,
  borderBottom: `1px solid ${vars.colors.brightness[200]}`,
  transform: "translateX(-50%)",
  zIndex: vars.zIndex.header,

  "@media": {
    "screen and (min-width: 519px)": {
      width: "520px",
    },
  },
});

const logo = style({
  margin: 0,
  fontSize: "24px",
  background: "url('/favicon.svg') no-repeat center center",
  color: "transparent",
  userSelect: "none",
});

const searchButton = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  padding: "0 10px 0 36px",
  height: "36px",
  backgroundColor: "transparent",
  border: "none",
  borderRadius: "8px",
  color: vars.colors.brightness[900],
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
      background: `url(${SVG.Map(
        vars.colors.brightness[900]
      )}) no-repeat center center`,
      backgroundSize: "18px 18px",
      content: "",
    },
  },
});

export { header, logo, searchButton };

