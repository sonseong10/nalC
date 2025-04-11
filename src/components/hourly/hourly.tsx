import moment from "moment";
import { WeatherApi } from "../../utils/HTTP";
import { Fragment, useEffect, useState } from "react";
import dfs_xy_conv from "../../utils/position";
import {
  card,
  contentsBox,
  FontBase,
  hourlyGroup,
  hourlyKeyGroup,
  keyOption,
  keyOptionGroup,
  vec,
  weatherImg,
} from "./hourly.css";

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
    numOfRows: 289,
    dataType: "JSON",
    base_date: date,
    base_time: "1700",
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
      const newArray = (
        res.data.response.body?.items?.item as {
          baseDate: string;
          baseTime: string;
          category: string;
          fcstDate: string;
          fcstTime: string;
          fcstValue: string;
          nx: number;
          ny: number;
        }[]
      ).filter((i) => i.category !== "TMX");

      for (let i = 0; i < newArray.length; i += 12) {
        grouped.push(newArray.slice(i, i + 12));
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

      <div className={contentsBox}>
        <div className={hourlyKeyGroup}>
          <span>오늘</span>

          <div className={keyOptionGroup}>
            <span className={keyOption}>강수량 mm</span>
            <span className={keyOption}>습도 % </span>
            <span className={keyOption}> 바람 m/s</span>
          </div>
        </div>
        <div className={hourlyGroup}>
          {toDayInfo.map((info, index) => (
            <div key={index} className={card}>
              <span className={FontBase}>
                {info[0].fcstTime.substring(0, 2)}시
              </span>
              {info.map(({ category }) => (
                <Fragment key={category}>
                  {category === "SKY" && (
                    <img
                      className={weatherImg}
                      src="https://ssl.pstatic.net/static/weather/image/icon_weather/ico_animation_wt1.svg"
                      alt="맑음"
                    />
                  )}
                </Fragment>
              ))}
              {info.map(({ category, fcstValue }) => {
                return (
                  <Fragment key={category}>
                    {category === "TMP" && (
                      <strong className={FontBase}>{fcstValue}°</strong>
                    )}

                    {category === "POP" && (
                      <span className={FontBase}>
                        {Number(fcstValue) <= 0 ? "-" : `${fcstValue}%`}
                      </span>
                    )}
                    {category === "PCP" && (
                      <span className={FontBase}>
                        {fcstValue === "강수없음"
                          ? "0"
                          : `${fcstValue.substring(0, 1)}`}
                      </span>
                    )}
                    {category === "REH" && (
                      <span className={FontBase}>{fcstValue}</span>
                    )}
                  </Fragment>
                );
              })}

              {info.map(
                ({ category, fcstValue }, index) =>
                  category === "VEC" && (
                    <div key={index}>
                      <img
                        style={{ transform: `rotate(${fcstValue}deg)` }}
                        className={vec}
                        src="https://www.weather.go.kr/w/resources/icon/ic_wd_48x.png"
                        alt=""
                      />
                    </div>
                  )
              )}
              {info.map(({ category, fcstValue }, index) => (
                <Fragment key={index}>
                  {category === "WSD" && (
                    <span className={FontBase}>
                      {Math.round(Number(fcstValue))}
                    </span>
                  )}
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Hourly;
