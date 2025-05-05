import { style } from "@vanilla-extract/css";
import SVG from "../../styles/icon";
import { vars } from "../../styles/globalTheme.css";

const popup = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  display: "block",
  padding: 0,
  margin: 0,
  width: "calc(100vw - 20px)",
  backgroundColor: vars.colors.brightness.white,
  border: "none",
  borderRadius: "4px",
  overflow: "hidden",
  boxShadow: `4px 4px 20px ${vars.colors.rgba.primary}`,
  zIndex: 100,
  transform: "translate3d(-50%, -50%, 0)",

  "@media": {
    "screen and (min-width: 720px)": {
      width: "calc(520px - 40px)",
    },
  },
});

const popupHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${vars.colors.brightness[200]}`,
  padding: "8px 10px",
});

const popupTitle = style({
  margin: 0,
  fontSize: "14px",
});

const closedButton = style({
  backgroundColor: vars.colors.brightness.white,
  border: "none",
  cursor: "pointer",

  ":hover": {
    color: vars.colors.red[900],
  },

  ":focus": {
    color: vars.colors.red[900],
    outline: "none",
  },
});

const searchForm = style({
  position: "relative",
  margin: "12px 10px",

  "::before": {
    position: "absolute",
    top: "50%",
    left: "8px",
    display: "block",
    width: "24px",
    height: "24px",
    background: `url(${SVG.Search("#262626")}) no-repeat center center`,
    transform: "translateY(-50%)",
    zIndex: vars.zIndex.components,
    content: "",
  },
});

const searchInput = style({
  position: "relative",
  width: "100%",
  height: "40px",
  paddingLeft: "36px",
  border: `1px solid ${vars.colors.brightness[400]}`,
  fontSize: "16px",
  borderRadius: "24px",
});

const sessionTitle = style({
  display: "inline-block",
  padding: "0 16px",
  margin: "8px 0",
  fontSize: "13px",
  color: vars.colors.brightness[700],
});

const addressGroup = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  maxHeight: "240px",
  overflowY: "auto",
});

const addressItem = style({
  display: "flex",
  alignItems: "center",
  padding: "0 16px",
  borderBottom: `1px solid ${vars.colors.brightness[300]}`,

  selectors: {
    "&:first-child": {
      borderTop: `1px solid ${vars.colors.brightness[300]}`,
    },
  },
});

const itemButton = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  width: "100%",
  height: "56px",
  border: 0,
  padding: 0,
  backgroundColor: vars.colors.brightness.white,
  fontSize: "14px",
  flex: "1",
  cursor: "pointer",

  ":hover": {
    opacity: 0.5,
  },
});

const placeName = style({
  marginBottom: "4px",
});

const addressName = style({
  color: vars.colors.brightness[500],
});

const dataNone = style({
  padding: "16px",
  textAlign: "center",
  color: vars.colors.brightness[600],
});

const bookmarkGroup = style({
  display: "flex",
  margin: 0,
  padding: "6px 10px",
  overflowX: "auto",
  listStyle: "none",

  "::-webkit-scrollbar": {
    display: "none",
  },
});

const bookmarkItem = style({
  position: "relative",
  width: "max-content",

  selectors: {
    "&:not(:last-child)": {
      marginRight: "6px",
    },
  },
});

const bookmarkButton = style({
  border: "none",
  width: "max-content",
  height: "32px",
  padding: "4px 10px",
  borderRadius: "24px",
  backgroundColor: vars.colors.brightness[200],
  cursor: "pointer",
});

export {
  popup,
  popupHeader,
  popupTitle,
  closedButton,
  searchForm,
  searchInput,
  sessionTitle,
  addressGroup,
  addressItem,
  itemButton,
  placeName,
  addressName,
  dataNone,
  bookmarkGroup,
  bookmarkItem,
  bookmarkButton,
};
