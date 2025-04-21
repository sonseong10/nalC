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

const getKmaBaseDateTime = (): {
  baseDate: string;
  baseTime: string;
} => {
  const now = moment();

  // 예보 발표 시간들 (역순 = 최근 발표부터 검사)
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
    const hour = parseInt(time.substring(0, 2), 10);
    const minute = 10; // 기상청 발표 반영 예상 시간

    const baseMoment = moment().set({ hour, minute, second: 0 });

    if (now.isSameOrAfter(baseMoment)) {
      return {
        baseDate: now.format("YYYYMMDD"),
        baseTime: time,
      };
    }
  }

  // 모두 해당되지 않으면 전날 23:00 기준
  const yesterday = now.clone().subtract(1, "day");

  return {
    baseDate: yesterday.format("YYYYMMDD"),
    baseTime: "2300",
  };
};

const todayWeatherAPI = async (status?: {
  latitude: number;
  longitude: number;
}) => {
  if (!status) {
    return;
  }

  const { baseDate, baseTime } = getKmaBaseDateTime();

  const rs = dfs_xy_conv("toXY", status.latitude, status.longitude);
  const params = {
    pageNo: 1,
    numOfRows: 289,
    dataType: "JSON",
    base_date: baseDate,
    base_time: baseTime,
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

      {toDayInfo.length <= 0 ? (
        <>로딩중입니다.</>
      ) : (
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
      )}
    </>
  );
}

export default Hourly;
