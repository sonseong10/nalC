import { globalFontFace, globalStyle } from "@vanilla-extract/css";
import { vars } from "./globalTheme.css";

export const textFont = "Nanum Gothic";
export const numFont = "DM Sans";

globalFontFace(textFont, [
  {
    src: 'url("/fonts/NanumGothic-Regular.ttf")',
    fontWeight: "normal",
  },
  {
    src: 'url("/fonts/NanumGothic-Bold.ttf")',
    fontWeight: "bold",
  },
]);

globalFontFace(numFont, [
  {
    src: 'url("/fonts/DMSans-Regular.ttf")',
    fontWeight: "normal",
    unicodeRange: "U+0030-0039",
  },
  {
    src: 'url("/fonts/DMSans-Medium.ttf")',
    fontWeight: "medium",
    unicodeRange: "U+0030-0039",
  },
  {
    src: 'url("/fonts/DMSans-SemiBold.ttf")',
    fontWeight: "semibold",
    unicodeRange: "U+0030-0039",
  },
  {
    src: 'url("/fonts/DMSans-Bold.ttf")',
    fontWeight: "bold",
    unicodeRange: "U+0030-0039",
  },
]);

globalStyle("html", {
  margin: 0,
  padding: 0,
  fontFamily: `${numFont}, ${textFont},  sans-serif`,
});

globalStyle("body", {
  margin: 0,
  padding: 0,
  color: vars.colors.brightness[800],
});

globalStyle("*", {
  fontWeight: 400,
  boxSizing: "border-box",
});

globalStyle("a", {
  display: "inline-block",
  marginRight: "2px",
  color: vars.colors.blue[800],
  textDecoration: "none",
});

globalStyle("figure", {
  margin: 0,
});

globalStyle("dd", {
  marginLeft: "2px",
});

globalStyle("p.offer_area", {
  color: vars.colors.brightness[500],
  fontSize: "12px",
});

globalStyle("*.hidden", {
  position: "absolute",
  width: "1px",
  height: "1px",
  fontSize: "1px",
  opacity: 0,
  zIndex: vars.zIndex.hidden,
});
