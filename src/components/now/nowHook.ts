import { useEffect, useState } from "react";
import dfs_xy_conv from "../../utils/position";
import { WeatherApi } from "../../utils/HTTP";
import moment from "moment";

const timePicker = () => {
  const info: { time: undefined | string; date: undefined | string } = {
    time: undefined,
    date: undefined,
  };
  const currentTime = moment().format("HHmm");
  info.date = moment().format("YYYYMMDD").toString();
  if (moment(currentTime).isBetween("1200", "0215")) {
    info.date = moment().subtract(1, "days").toString();
    info.time = "2300";
  } else if (moment(currentTime).isBetween("0215", "0515")) {
    info.time = "0200";
  } else if (moment(currentTime).isBetween("0515", "0815")) {
    info.time = "0500";
  } else if (moment(currentTime).isBetween("0815", "1115")) {
    info.time = "0800";
  } else if (moment(currentTime).isBetween("1115", "1415")) {
    info.time = "1300";
  } else if (moment(currentTime).isBetween("1415", "1715")) {
    info.time = "1730";
  } else if (moment(currentTime).isBetween("1715", "2015")) {
    info.time = "1850";
  } else if (moment(currentTime).isBetween("2015", "2315")) {
    info.time = "2000";
  } else {
    info.time = "2400";
  }

  return info;
};

const nowWeatherAPI = async (status?: {
  latitude: number;
  longitude: number;
}) => {
  if (!status) {
    return;
  }

  const { date, time } = timePicker();

  const rs = dfs_xy_conv("toXY", status.latitude, status.longitude);
  const params = {
    pageNo: 1,
    numOfRows: 60,
    dataType: "JSON",
    base_date: date,
    base_time: time,
    nx: rs.x,
    ny: rs.y,
  };

  const data = await WeatherApi.get(
    `/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst`,
    {
      params,
    }
  )
    .then((res) => {
      const array: Array<{
        category: string;
        fcstValue: string | number;
        baseDate: string;
        baseTime: string;
      }> = res.data.response.body?.items?.item
        .map((data: { [type: string]: string | number }) => {
          if (data.fcstTime === `${moment().hour() + 1}00`) {
            return {
              ...data,
            };
          }
        })
        .filter((e: Array<object | undefined>) => e);

      return array;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });

  return data;
};

export const useNowWeatherInfo = (status?: {
  latitude: number;
  longitude: number;
}) => {
  const [toDayInfo, setToDayInfo] = useState<
    Array<{
      category: string;
      fcstValue: string | number;
      baseDate: string;
      baseTime: string;
    }>
  >([]);

  useEffect(() => {
    if (status) {
      const fetchAndSetData = async () => {
        const data = await nowWeatherAPI(status);
        if (data) {
          setToDayInfo(data);
        }
      };
      fetchAndSetData();
    }
  }, [status]);

  return { toDayInfo };
};
