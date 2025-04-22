import { globalStyle } from "@vanilla-extract/css";

globalStyle("body", {
  margin: 0,
  padding: 0,
});

globalStyle("*", {
  boxSizing: "border-box",
  fontFamily: "Nanum Gothic, serif",
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