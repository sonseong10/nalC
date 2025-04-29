import { style } from "@vanilla-extract/css";
import SVG from "../../../styles/icon";

const regionGroup = style({
  paddingTop: "24px",
});

const todayInfo = style({
  display: "inline-block",
  width: "100%",
  textAlign: "center",
});

const bookmarkButton = style({
  border: "none",
  width: "36px",
  height: "36px",
  background: `url(${SVG.Star("#e8e8e8")})`,
  backgroundSize: "20px 20px",
  backgroundColor: "#fff",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  cursor: "pointer",
  boxSizing: "border-box",
});

const regionTextGroup = style({
  justifyContent: "center",
});

export { regionGroup, bookmarkButton, todayInfo, regionTextGroup };
