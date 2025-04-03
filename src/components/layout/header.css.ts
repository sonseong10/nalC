import { style } from "@vanilla-extract/css";
import SVG from "../../styles/icon";

export const hambugerMenu = style({
  border: "none",
  width: "52px",
  height: "46px",
  background: `url(${SVG.Map("#1d1d1d")})`,
  backgroundSize: "20px 20px",
  backgroundColor: "#fff",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  cursor: "pointer",
  boxSizing: "border-box",
});

export const searchBar = style({
  position: "relative",
});

export const searchButton = style({
  position: "absolute",
  right: "4px",
  border: "none",
  width: "36px",
  height: "36px",
  background: `url(${SVG.Search("#323232")})`,
  backgroundSize: "18px 18px",
  backgroundColor: "#fff",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  cursor: "pointer",
  boxSizing: "border-box",
});

export const inputBox = style({
  display: "block",
  border: "1px solid #e9e9e9",
  margin: 0,
  padding: "6px 38px 6px 8px",
  width: "260px",
  height: "40px",
  borderRadius: "4px",
});
