import { fontFace, globalStyle } from "@vanilla-extract/css";

const comicSans = fontFace({
  src: 'local("Nanum Gothic, serif")',
});

globalStyle("body", {
  margin: 0,
  padding: 0,
});

globalStyle("*", {
  boxSizing: "border-box",
  fontFamily: comicSans,
  fontWeight: 400,
  fontStyle: "normal",
});

globalStyle("a", {
  display: "inline-block",
  marginRight: "2px",
  color: "#0661b1",
  textDecoration: "none",
});

globalStyle("figure", {
  margin: 0,
});

globalStyle("dd", {
  marginLeft: "2px",
});

globalStyle("p.offer_area", {
  color: "#767678",
  fontSize: "12px",
});
