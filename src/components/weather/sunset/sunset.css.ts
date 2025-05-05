import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/globalTheme.css";

const box = style({
  position: "relative",
  padding: "38px",
  minBlockSize: "210px",
  backgroundColor: vars.colors.yellow[600],
  borderRadius: "10px",
  color: vars.colors.brightness.white,

  selectors: {
    "&.hidden": {
      backgroundColor: vars.colors.brightness[300],
    },
    "&.show": {
      backgroundColor: vars.colors.yellow[500],
    },
  },
});

const sunInfo = style({
  position: "absolute",
  bottom: "16px",
  left: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  transform: "translateX(-50%)",
});

const iconArea = style({
  position: "relative",
  display: "block",
  margin: "0 auto",
  width: "70px",
  height: "51px",
  overflow: "hidden",

  selectors: {
    "&.sunRise": {
      background:
        "url('https://ssl.pstatic.net/static/weather/image/animation/sun_up.svg') no-repeat",
    },
    "&.sunSet": {
      background:
        "url('https://ssl.pstatic.net/static/weather/image/animation/sun_down.svg') no-repeat",
    },
    "&:after": {
      position: "absolute",
      bottom: "-1px",
      left: "50%",
      backgroundPosition: "-590px -358px",
      backgroundRepeat: "no-repeat",
      width: "73px",
      height: "3px",
      backgroundColor: vars.colors.yellow[300],
      transform: "translateX(-50%)",
      content: "",
    },
  },
});

const timeTable = style({
  display: "flex",
  fontSize: "16px",
  alignItems: "center",

  "@media": {
    "screen and (min-width: 768px)": {
      fontSize: "18px",
    },
  },
});

const timeValue = style({
  marginLeft: "4px",
  selectors: {
    "&:nth-child(2)": {
      marginRight: "10px",
    },
  },
});

const sunChart = style({
  position: "relative",
  width: "264px",
  height: "136px",
  margin: "0 auto",
  transformOrigin: "50% 100%",
});

const progressBar = style({
  position: "relative",
  width: "264px",
  height: "136px",
  textAlign: "center",

  ":before": {
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: "2",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: vars.colors.yellow[100],
    content: "",
  },

  ":after": {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: "2",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: vars.colors.yellow[600],
    content: "",
  },
});

const currentBar = style({
  position: "absolute",
  width: "264px",
  height: "132px",
  overflow: "hidden",
});

const bar = style({
  width: "264px",
  height: "264px",
  borderRadius: "50%",
  border: `7px solid ${vars.colors.yellow[600]}`,
  borderBottomColor: vars.colors.yellow[100],
  borderRightColor: vars.colors.yellow[100],
});

const dot = style({
  position: "absolute",
  height: "264px",
  width: "264px",
  zIndex: 3,

  selectors: {
    "&:after": {
      position: "absolute",
      top: "50%",
      left: "-17px",
      width: "42px",
      height: "42px",
      display: "block",
      backgroundColor: vars.colors.yellow[200],
      borderRadius: "21px",
      border: `5px solid ${vars.colors.yellow[400]}`,
      boxSizing: "border-box",
      transform: "translateY(-50%)",
      content: "",
    },
  },
});

export {
  box,
  sunInfo,
  iconArea,
  timeTable,
  timeValue,
  sunChart,
  progressBar,
  currentBar,
  bar,
  dot,
};
