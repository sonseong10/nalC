import { globalStyle, style } from "@vanilla-extract/css";

const forecastList = style({
  listStyle: "none",
  paddingLeft: 0,
});

const info = style({
  display: "flex",
  flexDirection: "column",
  fontSize: "14px",
  padding: "10px 0",
  selectors: {
    "&:not(:last-child)": {
      borderBottom: "1px solid #eee",
    },
  },
});

globalStyle("span.forecastBadge", {
  display: "inline-block",
  marginBottom: "4px",
  padding: "4px 8px",
  width: "max-content",
  border: "1px solid",
  borderRadius: "12px",
  fontSize: "12px",
});

export { forecastList, info };
