import { style } from "@vanilla-extract/css";
import SVG from "../../styles/icon";

const popup = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  display: "block",
  padding: 0,
  margin: 0,
  width: "calc(520px - 40px)",
  backgroundColor: "#fff",
  border: "none",
  boxShadow: "4px 4px 16px rgba(0,0,0,0.4)",
  zIndex: 100,
  transform: "translate3d(-50%, -50%, 0)",
});

const popupHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #ddd",
  padding: "8px 10px",
});

const popupTitle = style({
  margin: 0,
  fontSize: "14px",
});

const closedButton = style({
  backgroundColor: "#fff",
  border: "none",
  cursor: "pointer",

  ":hover": {
    color: "#ff4949",
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
    background: `url(${SVG.Search("#1d1d1d")}) no-repeat center center`,
    transform: "translateY(-50%)",
    zIndex: "1",
    content: "",
  },
});

const searchInput = style({
  position: "relative",
  width: "100%",
  height: "40px",
  paddingLeft: "36px",
  border: "1px solid #ddd",
  fontSize: "16px",
  borderRadius: "24px",
});

const sessionTitle = style({
  display: "inline-block",
  padding: "0 16px",
  margin: "8px 0",
  fontSize: "13px",
  color: "#828282",
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
  borderBottom: "1px solid #ddd",

  selectors: {
    "&:first-child": {
      borderTop: "1px solid #ddd",
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
  backgroundColor: "#fff",
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
  color: "#828282",
});



const dataNone = style({
  padding: "16px",
  textAlign: "center",
  color: "gray",
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
  backgroundColor: "#f4f6f8",
  color: "#1d1d1d",
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
