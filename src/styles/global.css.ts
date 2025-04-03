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

globalStyle("figure", {
  margin: 0,
});