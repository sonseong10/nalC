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
  swiperButton,
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

const getTimeLabel = (fcstDate: string, fcstTime: string): string => {
  const forecastDate = moment(fcstDate, "YYYYMMDD"); // fcstDate를 moment 객체로 변환
  const forecastTime = moment(fcstTime, "HHmm"); // fcstTime을 moment 객체로 변환

  const tomorrow = moment().add(1, "day");
  const dayAfter = moment().add(2, "day");
  const threeDaysLater = moment().add(3, "day");

  // 만약 시간이 "00시"일 때 내일, 모레, 글피로 변경
  if (forecastTime.hour() === 0) {
    if (forecastDate.isSame(tomorrow, "day")) return "내일";
    if (forecastDate.isSame(dayAfter, "day")) return "모레";
    if (forecastDate.isSame(threeDaysLater, "day")) return "글피";
  }

  // 그 외 시간은 기존 방식대로 "00시" 형식으로 처리
  return `${forecastTime.format("HH")}시`;
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
      if (!hasFetchedRef.current && status && info.inc) {
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

const weatherCodeImage = (sky: number, pty: number, isSun: boolean) => {
  // console.log(isSun);

  // 일몰 후에는 강수(PTY) 우선, 그 후 하늘 상태(SK)
  if (isSun) {
    if (pty !== 0) {
      // 강수 있음
      switch (pty) {
        case 1:
          return 31; // 비
        case 2:
          return 33; // 비/눈
        case 3:
          return 22; // 눈
        case 5:
          return 34; // 빗방울
        case 6:
          return 36; // 눈날림
        case 7:
          return 37; // 빗방울/눈날림
        default:
          return 2; // 강수 없음 → 맑음 또는 흐림 (기본값)
      }
    }

    // 강수 없음일 때 하늘 상태(SK) 처리
    switch (sky) {
      case 3:
        return 6; // 흐림
      case 4:
        return 7; // 매우 흐림
      case 1:
      default:
        return 2; // 맑음
    }
  }

  if (pty !== 0) {
    switch (pty) {
      case 1:
        return 22; // 비
      case 2:
        return 24; // 비/눈
      case 3:
        return 23; // 눈
      case 5:
        return 25; // 빗방울
      case 6:
        return 27; // 눈날림
      case 7:
        return 28; // 빗방울/눈날림
      default:
        return 1; // 강수 없음 → 맑음 또는 흐림 (기본값)
    }
  }

  // 강수 없음일 때 하늘 상태(SK) 처리
  switch (sky) {
    case 3:
      return 5; // 흐림
    case 4:
      return 7; // 매우 흐림
    case 1:
    default:
      return 1; // 맑음
  }
};

function Hourly({ status }: IHourlyWeatherProps) {
  const { weatherData } = useWeatherData(status);
  const swiperRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const checkPosition = () => {
      const { scrollLeft, scrollWidth, clientWidth } = swiper;
      setAtStart(scrollLeft === 0);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    };

    checkPosition();

    swiper.addEventListener("scroll", checkPosition);

    return () => swiper.removeEventListener("scroll", checkPosition);
  }, [weatherData]);

  return (
    <>
      {weatherData.length === 0 ? (
        <div className={loadingBox}>
          <Shimmer aria-label={"로딩중입니다"} />
        </div>
      ) : (
        <div className={contentsBox}>
          {!atStart && (
            <button
              className={`${swiperButton} before`}
              onClick={() => {
                swiperRef.current!.scrollTo({
                  left: swiperRef.current!.scrollLeft - 300,
                  behavior: "smooth",
                });
              }}
            >
              <span aria-label="이전 시간으로 이동">{"<"}</span>
            </button>
          )}

          <div className={hourlyKeyGroup}>
            <span>오늘</span>
            <div className={keyOptionGroup}>
              <span className={keyOption}>강수 mm</span>
              <span className={keyOption}>습도 %</span>
              <span className={keyOption}>바람 m/s</span>
            </div>
          </div>
          <div className={hourlyGroup} ref={swiperRef}>
            {weatherData.map((group, index) => {
              const timeLabel = getTimeLabel(
                group[0].fcstDate,
                group[0].fcstTime
              );
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
                      src={`https://ssl.pstatic.net/static/weather/image/icon_weather/ico_animation_wt${weatherCodeImage(
                        Number(categoryMap.get("SKY")!.fcstValue),
                        Number(categoryMap.get("PTY")!.fcstValue),
                        categoryMap.get("SKY")!.isNight!
                      )}.svg`}
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

          {!atEnd && (
            <button
              className={`${swiperButton} after`}
              onClick={() => {
                swiperRef.current!.scrollTo({
                  left: swiperRef.current!.scrollLeft + 300,
                  behavior: "smooth",
                });
              }}
            >
              <span aria-label="이후 시간으로 이동">{">"}</span>
            </button>
          )}
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
