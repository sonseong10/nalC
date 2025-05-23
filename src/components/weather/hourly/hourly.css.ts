import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../../../styles/globalTheme.css";

const loadingBox = style({
  position: "relative",
  minHeight: "230px",
  backgroundColor: vars.colors.brightness[300],
});

const contentsBox = style({
  position: "relative",
  display: "flex",
  borderBottom: `1px solid ${vars.colors.brightness[300]}`,
});

const hourlyKeyGroup = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 0 16px",
  borderRight: `1px solid ${vars.colors.brightness[300]}`,
  flex: "0 0 80px",
});

const keyOptionGroup = style({
  display: "flex",
  flexDirection: "column",
  fontSize: "12px",
  color: vars.colors.brightness[600],
});

const keyOption = style({
  margin: "10px 0",
});

const hourlyGroup = style({
  display: "flex",
  overflowX: "auto",
  maxWidth: "calc(520px - 80px)",
  overflow: "auto",

  "::-webkit-scrollbar": {
    display: "none",
  },
});

const card = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  flex: "0 0 100px",
  padding: "8px 0",

  selectors: {
    "&:not(:last-child)": {
      borderRight: `1px solid ${vars.colors.brightness[300]}`,
    },
  },
});

const weatherImg = style({
  width: "32px",
  objectFit: "cover",
});

const FontBase = style({
  display: "inline-block",
  margin: "6px 0",
  fontSize: "14px",
  fontWeight: 700,
});

const vec = style({
  width: "16px",
});

const tomorrow = style({
  color: vars.colors.blue[900],
});

const afterTomorrow = style({
  color: vars.colors.blue[700],
});

const swiperButton = style({
  position: "absolute",
  top: "50%",
  display: "none",
  width: "44px",
  height: "44px",
  borderRadius: "22px",
  border: `1px solid ${vars.colors.brightness[300]}`,
  backgroundColor: vars.colors.brightness.white,
  cursor: "pointer",
  transform: "translateY(-50%)",

  selectors: {
    "&.before": {
      left: "56px",
    },

    "&.after": {
      right: 0,
    },
  },
});

globalStyle(`${contentsBox}:hover button`, {
  display: "block",
});

export {
  loadingBox,
  contentsBox,
  hourlyKeyGroup,
  keyOptionGroup,
  keyOption,
  card,
  hourlyGroup,
  weatherImg,
  FontBase,
  vec,
  tomorrow,
  afterTomorrow,
  swiperButton,
};
