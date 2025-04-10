import { style } from "@vanilla-extract/css";

const contentsBox = style({
  display: "flex",
  borderBottom: "1px solid #d1d1d1",
});

const hourlyKeyGroup = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "14px",
  borderRight: "1px solid #ddd",
  flex: "0 0 80px",
});

const keyOptionGroup = style({
  display: "flex",
  flexDirection: "column",
  fontSize: "12px",
  color: "#555",
});

const keyOption = style({
  margin: "8px 0",
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
  justifyContent: "center",
  flex: "0 0 100px",
  borderRight: "1px solid #ddd",
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
  color: "#222",
});

const vec = style({
  width: "16px",
});

export {
  contentsBox,
  hourlyKeyGroup,
  keyOptionGroup,
  keyOption,
  card,
  hourlyGroup,
  weatherImg,
  FontBase,
  vec,
};
