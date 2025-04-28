import { style } from "@vanilla-extract/css";

const box = style({
  position: "relative",
  padding: "38px",
  borderColor: "#f7b000",
  backgroundColor: "#ffb900",
  borderRadius: "10px",
  color: "#fff",
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
      backgroundColor: "#ffe361",
      transform: "translateX(-50%)",
      content: "",
    },
  },
});

const timeTable = style({
  display: "flex",
  fontSize: "18px",
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
    zIndex: "10",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: "#fefbbd",
    content: "",
  },

  ":after": {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: "10",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: "#ea9000",
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
  border: "7px solid #ea9000",
  borderBottomColor: "#fefbbd",
  borderRightColor: "#fefbbd",
});

const dot = style({
  position: "absolute",
  height: "264px",
  width: "264px",
  zIndex: 100,

  selectors: {
    "&:after": {
      position: "absolute",
      top: "50%",
      left: "-17px",
      width: "42px",
      height: "42px",
      display: "block",
      backgroundColor: "#fffca5",
      borderRadius: "21px",
      border: "5px solid #feda39",
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
