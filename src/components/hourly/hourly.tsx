import moment from "moment";
import { flexRow } from "../../styles/app.css";
import { WeatherApi } from "../../utils/HTTP";
import { Fragment, useEffect, useState } from "react";
import dfs_xy_conv from "../../utils/position";
import { card } from "./hourly.css";

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

const todayWeatherAPI = async (status?: {
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
    numOfRows: 288,
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
      const grouped: Array<
        {
          baseDate: string;
          baseTime: string;
          category: string;
          fcstDate: string;
          fcstTime: string;
          fcstValue: string;
          nx: number;
          ny: number;
        }[]
      > = [];
      for (let i = 0; i < res.data.response.body?.items?.item.length; i += 12) {
        grouped.push(res.data.response.body?.items?.item.slice(i, i + 12));
      }

      return grouped;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });

  return data;
};

const useTodayWeatherInfo = (status?: {
  latitude: number;
  longitude: number;
}) => {
  const [toDayInfo, setToDayInfo] = useState<
    Array<
      {
        baseDate: string;
        baseTime: string;
        category: string;
        fcstDate: string;
        fcstTime: string;
        fcstValue: string;
        nx: number;
        ny: number;
      }[]
    >
  >([]);

  useEffect(() => {
    if (status) {
      const fetchAndSetData = async () => {
        const data = await todayWeatherAPI(status);
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
  const { toDayInfo } = useTodayWeatherInfo(status);

  console.log(toDayInfo);

  return (
    <>
      <h2>시간별 날씨</h2>

      <div className={flexRow}>
        {toDayInfo.map((info, index) => (
          <div key={index} className={card}>
            <span>{info[0].fcstTime.substring(0, 2)}시</span>
            {info.map(({ category, fcstValue }, index) => {
              return (
                <Fragment key={index}>
                  {category === "TMP" && <strong>{fcstValue}°</strong>}

                  {category === "SKY" && (
                    <img
                      src="https://ssl.pstatic.net/static/weather/image/icon_weather/ico_animation_wt2.svg"
                      alt="맑음"
                    />
                  )}
                  {category === "POP" && (
                    <span>
                      {Number(fcstValue) <= 0 ? "-" : `${fcstValue}%`}
                    </span>
                  )}
                  {category === "REH" && <span>{fcstValue}</span>}
                </Fragment>
              );
            })}

            {info.map(
              ({ category, fcstValue }, index) =>
                (category === "WSD" || category === "VEC") && (
                  <div key={index}>
                    <span>{category === "VEC" && fcstValue}</span>
                    <span>
                      {category === "WSD" && Math.round(Number(fcstValue))}
                    </span>
                  </div>
                )
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Hourly;
