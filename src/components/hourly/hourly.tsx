import moment from "moment";
import { WeatherApi } from "../../utils/HTTP";
import { useEffect, useState } from "react";
import dfs_xy_conv from "../../utils/position";

function adjustMinutes(time: moment.Moment): string {
  const minutes = time.minutes();

  if (minutes >= 45) {
    time.set("minutes", 30);
  } else {
    time.subtract(1, "hour").set("minutes", 30);
  }

  return time.format("HHmm");
}

const timePicker = () => {
  const info: { time: undefined | string; date: undefined | string } = {
    time: undefined,
    date: undefined,
  };
  info.date = moment().format("YYYYMMDD").toString();
  info.time = adjustMinutes(moment());

  return info;
};

const nowWeatherAPI = async (status?: {
  latitude: number;
  longitude: number;
}) => {
  if (!status) {
    return;
  }

  const { date } = timePicker();

  const rs = dfs_xy_conv("toXY", status.latitude, status.longitude);
  const params = {
    pageNo: 1,
    numOfRows: 229,
    dataType: "JSON",
    base_date: date,
    base_time: "1400",
    nx: rs.x,
    ny: rs.y,
  };

  const data = await WeatherApi.get(
    `/1360000/VilageFcstInfoService_2.0/getVilageFcst`,
    {
      params,
    }
  )
    .then((res) => {
      console.log(res.data.response.body?.items?.item);

      return [];
    })
    .catch((error) => {
      console.error(error);
      return [];
    });

  return data;
};

const useNowWeatherInfo = (status?: {
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

interface NowWeatherProps {
  status?: {
    latitude: number;
    longitude: number;
  };
}

function Hourly({ status }: NowWeatherProps) {
  useNowWeatherInfo(status);
  return (
    <>
      <h2>시간별 날씨</h2>

      <div></div>
    </>
  );
}

export default Hourly;
