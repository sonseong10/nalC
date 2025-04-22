import { style } from "@vanilla-extract/css";

const box = style({
  position: "relative",
  padding: "24px",
  borderColor: "#f7b000",
  backgroundColor: "#ffb900",
  borderRadius: "10px",
  color: "#fff",
});

const sunInfo = style({
  position: "absolute",
  bottom: "6px",
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
  background:
    "url('https://ssl.pstatic.net/static/weather/image/animation/sun_up.svg') no-repeat",

  "::after": {
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
});

const timeTable = style({
  display: "flex",
  fontSize: "16px",
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
});

const progressBar = style({
  position: "relative",
  textAlign: "center",
  width: "264px",
  height: "136px",
  transform: "scale(1)",

  ":before": {
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: "10",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: "#ea9000",
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
  overflow: "hidden",
  width: "264px",
  height: "132px",
});

const bar = style({
  width: "264px",
  height: "264px",
  borderRadius: "50%",
  boxSizing: "border-box",
  border: "7px solid #ea9000",
  borderBottomColor: "#ea9000",
  borderRightColor: "#ea9000",
  /* -webkit-transform: rotate(45deg); */
  /* transform: rotate(45deg); */
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
};
