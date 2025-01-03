import { useEffect, useState } from "react";
import dfs_xy_conv from "../../utils/position";
import { WeatherApi } from "../../utils/HTTP";
import moment from "moment";

const nowWeatherAPI = async (status?: {
  latitude: number;
  longitude: number;
}) => {
  if (!status) {
    return;
  }

  const rs = dfs_xy_conv("toXY", status.latitude, status.longitude);

  const params = {
    pageNo: 1,
    numOfRows: 60,
    dataType: "JSON",
    base_date: moment().format("YYYYMMDD"),
    base_time: moment().format("HHmm"),
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
      }> = res.data.response.body.items.item
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
