import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/globalTheme.css";

const blind = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  backgroundColor: vars.colors.rgba.primary,
  cursor: "pointer",
  zIndex: vars.zIndex.layer,
});

export { blind };
