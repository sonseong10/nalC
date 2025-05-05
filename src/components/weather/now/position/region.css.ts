import { style } from "@vanilla-extract/css";
import SVG from "../../../../styles/icon";
import { vars } from "../../../../styles/globalTheme.css";

const regionGroup = style({
  // paddingTop: "24px",
});

const todayInfo = style({
  display: "inline-block",
  marginTop: "24px",
  width: "100%",
  textAlign: "center",
});

const bookmarkButton = style({
  border: "none",
  width: "36px",
  height: "36px",
  background: `url(${SVG.Star("#E0E0E0")}) no-repeat center center`,
  backgroundSize: "22px 22px",
  backgroundColor: vars.colors.brightness.white,
  cursor: "pointer",
  boxSizing: "border-box",

  selectors: {
    "&.isActive": {
      background: `url(${SVG.Star("#feda39")}) no-repeat center center`,
      backgroundSize: "22px 22px",
    },
  },
});

const regionTextGroup = style({
  justifyContent: "center",
});

export { regionGroup, bookmarkButton, todayInfo, regionTextGroup };
