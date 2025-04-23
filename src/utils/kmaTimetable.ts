import moment from "moment";

const getKmaBaseDateTime = (): { baseDate: string; baseTime: string } => {
  const now = moment();
  const baseTimes = [
    "2300",
    "2000",
    "1700",
    "1400",
    "1100",
    "0800",
    "0500",
    "0200",
  ];

  for (const time of baseTimes) {
    const hour = parseInt(time.slice(0, 2), 10);
    const minute = 10;
    const baseMoment = moment().set({ hour, minute, second: 0 });

    if (now.isSameOrAfter(baseMoment)) {
      return {
        baseDate: now.format("YYYYMMDD"),
        baseTime: time,
      };
    }
  }

  return {
    baseDate: moment().subtract(1, "day").format("YYYYMMDD"),
    baseTime: "2300",
  };
};

export default getKmaBaseDateTime;
