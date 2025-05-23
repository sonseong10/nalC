import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/globalTheme.css";

const loadingBox = style({
  position: "relative",
  minHeight: "200px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: vars.colors.brightness[300],
  color: vars.colors.brightness[500],
});

const weatherGroup = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
});

const weatherImage = style({
  position: "absolute",
  top: "50%",
  left: "42%",
  display: "block",
  width: "96px",
  transform: "translate3d(-50%, -50%, 0)",
});

const tmp = style({
  position: "relative",
  fontSize: "64px",
  fontWeight: "700",
  letterSpacing: "-3px",
});

const infoGroup = style({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  marginTop: "48px",
  color: vars.colors.brightness[500],
  fontSize: "12px",
});

const infoDesc = style({
  margin: "0 10px",
});

const logo = style({
  width: "48px",
});

export {
  loadingBox,
  weatherGroup,
  weatherImage,
  tmp,
  infoGroup,
  infoDesc,
  logo,
};
