import { style } from "@vanilla-extract/css";

const weatherGroup = style({
  position: "relative",
});

const weatherImage = style({
  position: "absolute",
  width: "96px",
  top: "-16px",
  left: "32%",
});

const tmp = style({
  position: "relative",
  display: "inline-block",
  width: "100%",
  textAlign: "center",
  fontSize: "64px",
  fontWeight: "700",
  letterSpacing: "-8px",
});

const infoGroup = style({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  marginTop: "48px",
  color: "#767678",
  fontSize: "12px",
});

const infoDesc = style({
  margin: "0 10px",
});

const logo = style({
  width: "48px",
});

export { weatherGroup, weatherImage, tmp, infoGroup, infoDesc, logo };
