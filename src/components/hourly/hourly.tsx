function Hourly() {
  // const timePicker = () => {
  //   const info: { time: undefined | string; date: undefined | string } = {
  //     time: undefined,
  //     date: undefined,
  //   };
  //   const currentTime = moment().format("HHmm");
  //   info.date = moment().format("YYYYMMDD").toString();
  //   if (moment(currentTime).isBetween("1200", "0215")) {
  //     info.date = moment().subtract(1, "days").toString();
  //     info.time = "2300";
  //   } else if (moment(currentTime).isBetween("0215", "0515")) {
  //     info.time = "0200";
  //   } else if (moment(currentTime).isBetween("0515", "0815")) {
  //     info.time = "0500";
  //   } else if (moment(currentTime).isBetween("0815", "1115")) {
  //     info.time = "0800";
  //   } else if (moment(currentTime).isBetween("1115", "1415")) {
  //     info.time = "1100";
  //   } else if (moment(currentTime).isBetween("1415", "1715")) {
  //     info.time = "1400";
  //   } else if (moment(currentTime).isBetween("1715", "2015")) {
  //     info.time = "1700";
  //   } else if (moment(currentTime).isBetween("2015", "2315")) {
  //     info.time = "2000";
  //   } else {
  //     info.time = "2400";
  //   }

  //   return info;
  // };
  return (
    <>
      <h2>시간별 날씨</h2>

      <div></div>
    </>
  );
}

export default Hourly;
