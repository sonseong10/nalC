import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { WeatherApi } from "../../../utils/HTTP";
import dfs_xy_conv from "../../../utils/position";
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
  tomorrow,
  afterTomorrow,
  loadingBox,
} from "./hourly.css";
import Title from "../../layout/Title";
import getKmaBaseDateTime from "../../../utils/kmaTimetable";
import useWeatherStore from "../../../store";
import { useShallow } from "zustand/shallow";
import Shimmer from "../../layout/shimmer/Shimmer";

interface ForecastItem {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

interface ForecastGroup extends ForecastItem {
  isNight?: boolean;
  dayLabel: "오늘" | "내일" | "모레";
  timeLabel: string;
}

interface IHourlyWeatherProps {
  status: {
    latitude: number;
    longitude: number;
  } | null;
}

const fetchWeatherData = async (status: {
  latitude: number;
  longitude: number;
}) => {
  const { baseDate, baseTime } = getKmaBaseDateTime();
  const rs = dfs_xy_conv("toXY", status.latitude, status.longitude);

  const params = {
    pageNo: 1,
    numOfRows: 650,
    dataType: "JSON",
    base_date: baseDate,
    base_time: baseTime,
    nx: rs.x,
    ny: rs.y,
  };

  try {
    const res = await WeatherApi.get(
      `/1360000/VilageFcstInfoService_2.0/getVilageFcst`,
      { params }
    );

    const rawItems = res.data.response?.body?.items?.item as ForecastItem[];

    const now = moment();
    const filtered = (rawItems ? rawItems : [])
      .filter((i) => !["TMX", "TMN"].includes(i.category))
      .filter((i) => {
        return (
          i.fcstDate > now.format("YYYYMMDD") ||
          Number(i.fcstTime) > Number(now.format("HHmm"))
        );
      });

    // 12개씩 묶기 (1시간치)
    const grouped: ForecastItem[][] = [];
    for (let i = 0; i < filtered.length; i += 12) {
      grouped.push(filtered.slice(i, i + 12));
    }

    const today = moment();
    const tomorrow = moment().add(1, "day");
    const dayAfter = moment().add(2, "day");

    const addDayLabel = (date: string): ForecastGroup["dayLabel"] => {
      const d = moment(date, "YYYYMMDD");
      if (d.isSame(today, "day")) return "오늘";
      if (d.isSame(tomorrow, "day")) return "내일";
      if (d.isSame(dayAfter, "day")) return "모레";
      return "오늘";
    };

    return grouped
      .filter((group) => group.length === 12)
      .map((group) =>
        group.map((item) => ({
          ...item,
          dayLabel: addDayLabel(item.fcstDate),
          timeLabel: `${item.fcstTime.slice(0, 2)}시`,
        }))
      );
  } catch (error) {
    console.error("기상청 API 오류:", error);
    return [];
  }
};

const useWeatherData = (
  status: { latitude: number; longitude: number } | null
) => {
  const [weatherData, setWeatherData] = useState<ForecastGroup[][]>([]);

  const { info } = useWeatherStore(
    useShallow((state) => ({ info: state.info }))
  );

  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const init = async () => {
      if (info && status && !hasFetchedRef.current) {
        hasFetchedRef.current = true;
        await fetchWeatherData(status).then((data) => {
          if (data) {
            const updatedData = data.map((group) =>
              group.map((item) => ({
                ...item,
                isNight:
                  moment(item.fcstTime, "HHmm").isAfter(
                    moment(info.set, "HH:mm")
                  ) ||
                  moment(item.fcstTime, "HHmm").isBefore(
                    moment(info.inc, "HH:mm")
                  ),
              }))
            );
            setWeatherData(updatedData);
          }
        });
      } else {
        hasFetchedRef.current = false;
      }
    };

    init();
  }, [status, info]);

  return { weatherData };
};

function Hourly({ status }: IHourlyWeatherProps) {
  const { weatherData } = useWeatherData(status);

  return (
    <>
      {weatherData.length === 0 ? (
        <div className={loadingBox}>
          <Shimmer aria-label={"로딩중입니다"} />
        </div>
      ) : (
        <div className={contentsBox}>
          <div className={hourlyKeyGroup}>
            <span>오늘</span>
            <div className={keyOptionGroup}>
              <span className={keyOption}>강수 mm</span>
              <span className={keyOption}>습도 %</span>
              <span className={keyOption}>바람 m/s</span>
            </div>
          </div>
          <div className={hourlyGroup}>
            {weatherData.map((group, index) => {
              const timeLabel = group[0].timeLabel;
              const dayLabel = group[0].dayLabel;
              const categoryMap = new Map(
                group.map((item) => [item.category, item])
              );
              return (
                <div key={index} className={card}>
                  <span
                    className={`${FontBase} ${
                      dayLabel === "모레"
                        ? afterTomorrow
                        : dayLabel === "내일"
                        ? tomorrow
                        : null
                    }`}
                  >
                    {timeLabel}
                  </span>

                  {/* SKY */}
                  {categoryMap.has("SKY") && (
                    <img
                      className={weatherImg}
                      src={`https://ssl.pstatic.net/static/weather/image/icon_weather/ico_animation_wt${
                        categoryMap.get("SKY")!.isNight ? 2 : 1
                      }.svg`}
                      alt="날씨"
                    />
                  )}

                  {/* TMP */}
                  {categoryMap.has("TMP") && (
                    <strong className={FontBase}>
                      {`${categoryMap.get("TMP")!.fcstValue}°`}
                    </strong>
                  )}

                  {/* POP */}
                  {categoryMap.has("POP") && (
                    <span className={FontBase}>
                      {Number(categoryMap.get("POP")!.fcstValue) <= 0
                        ? "-"
                        : `${categoryMap.get("POP")!.fcstValue}%`}
                    </span>
                  )}

                  {/* PCP */}
                  {categoryMap.has("PCP") && (
                    <span className={FontBase}>
                      {categoryMap.get("PCP")!.fcstValue === "강수없음"
                        ? "0"
                        : categoryMap.get("PCP")!.fcstValue}
                    </span>
                  )}

                  {/* REH */}
                  {categoryMap.has("REH") && (
                    <span className={FontBase}>
                      {categoryMap.get("REH")!.fcstValue}
                    </span>
                  )}

                  {/* WSD */}
                  {categoryMap.has("WSD") && (
                    <span className={FontBase}>
                      {Math.round(Number(categoryMap.get("WSD")!.fcstValue))}
                    </span>
                  )}

                  {/* VEC */}
                  {categoryMap.has("VEC") && (
                    <img
                      className={vec}
                      src="https://www.weather.go.kr/w/resources/icon/ic_wd_48x.png"
                      alt="바람방향"
                      style={{
                        transform: `rotate(${
                          categoryMap.get("VEC")!.fcstValue
                        }deg)`,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

function HourlySection({ status }: IHourlyWeatherProps) {
  const { baseDate, baseTime } = getKmaBaseDateTime();

  return (
    <>
      <Title text="시간별 날씨" />

      <Hourly status={status} />
      <p className="offer_area">
        <a
          href="https://www.weather.go.kr/w/index.do"
          target="_blank"
          rel="noreferrer"
        >
          기상청
        </a>
        발표 기준 {moment(baseDate).format("YYYY.MM.DD.")}{" "}
        {baseTime.slice(0, 2)}:00
      </p>
    </>
  );
}

export default HourlySection;
