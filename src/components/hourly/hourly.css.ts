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
  paddingBottom: "20px",
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
  height: "218px",

  selectors: {
    "&:not(:last-child)": {
      borderRight: "1px solid #ddd",
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
  color: "#222",
});

const vec = style({
  width: "16px",
});

const tomorrow = style({
  color: "#7a59f1",
});

const afterTomorrow = style({
  color: "#45c1e0",
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
  tomorrow,
  afterTomorrow,
};
