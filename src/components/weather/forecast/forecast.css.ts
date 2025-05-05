import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../../../styles/globalTheme.css";

const forecastList = style({
  listStyle: "none",
  paddingLeft: 0,
});

const info = style({
  display: "flex",
  flexDirection: "column",
  fontSize: "14px",
  color: vars.colors.brightness[800],
  padding: "10px 0",
  selectors: {
    "&:not(:last-child)": {
      borderBottom: `1px solid ${vars.colors.brightness[300]}`,
    },
  },
});

globalStyle("span.forecastBadge", {
  display: "inline-block",
  marginBottom: "4px",
  padding: "4px 8px",
  width: "max-content",
  border: `1px solid ${vars.colors.brightness[800]}`,
  borderRadius: "12px",
  fontSize: "12px",
});

export { forecastList, info };
