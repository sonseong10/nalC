import Title from "../../layout/Title";
import {
  box,
  sunInfo,
  iconArea,
  timeTable,
  timeValue,
  sunChart,
  progressBar,
  currentBar,
  bar,
  dot,
  offerArea,
} from "./sunset.css";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { WeatherApi } from "../../../utils/HTTP";
import useWeatherStore from "../../../store/index";
import { useShallow } from "zustand/shallow";
import Shimmer from "../../layout/shimmer/Shimmer";

interface ISunsetInfoProps {
  status: {
    latitude: number;
    longitude: number;
  } | null;
}

function SunsetInfo({ status }: ISunsetInfoProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [apiDown, setApiDown] = useState<boolean>(false);
  const { info, setSunInfo } = useWeatherStore(
    useShallow((state) => ({
      info: state.info,
      setSunInfo: state.setSunInfo,
    }))
  );

  useEffect(() => {
    if (!status) return;

    const KASI_URL =
      "https://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService/getLCRiseSetInfo";

    const fetchKasiApi = async () => {
      const params = {
        serviceKey: process.env.NEXT_PUBLIC_WEATHER_API_KEY, // 공공데이터포털 인증키
        locdate: moment().format("YYYYMMDD"),
        longitude: status.longitude,
        latitude: status.latitude,
        dnYn: "Y",
      };

      setLoading(true);
      try {
        const res = await WeatherApi.get(KASI_URL, { params });
        const item = res.data?.response?.body?.items?.item;

        // 정상 데이터
        setSunInfo({
          inc: moment(item?.sunrise.trim(), "HHmm").format("HH:mm"),
          set: moment(item?.sunset.trim(), "HHmm").format("HH:mm"),
        });
        setApiDown(false);
      } catch (err: any) {
        console.warn("KASI API 오류 → 대체 데이터 요청 시작");
        setApiDown(true);
        setSunInfo({ inc: "06:45", set: "17:52" });
      } finally {
        setLoading(false);
      }
    };

    fetchKasiApi();
  }, [setSunInfo, status]);

  const rotateDeg = useMemo(() => {
    if (!info?.inc || !info?.set) return { dot: 0, bar: 45 };

    const GAP = 45;
    const now = moment();
    const sunrise = moment(info.inc, "HH:mm");
    const sunset = moment(info.set, "HH:mm");

    if (sunset.isBefore(sunrise)) sunset.add(1, "day");

    if (now.isBefore(sunrise)) return { dot: 0, bar: GAP };
    if (now.isAfter(sunset)) return { dot: 180, bar: 225 };

    const total = sunset.diff(sunrise, "seconds");
    const passed = now.diff(sunrise, "seconds");
    const progress = passed / total;

    return {
      dot: progress * 180,
      bar: progress * 180 + GAP,
    };
  }, [info]);

  return (
    <div className={`${box} ${loading || !info ? "hidden" : "show"}`}>
      {loading || !info ? (
        <Shimmer />
      ) : (
        <>
          <div className={sunChart}>
            <div
              className={dot}
              style={{ transform: `rotate(${rotateDeg.dot}deg)` }}
            />
            <div className={progressBar}>
              <div className={currentBar}>
                <div
                  className={bar}
                  style={{ transform: `rotate(${rotateDeg.bar}deg)` }}
                />
              </div>
            </div>
          </div>

          <div className={sunInfo}>
            <div
              className={`${iconArea} ${
                moment().isBefore(moment("12:00", "HH:mm"))
                  ? "sunRise"
                  : "sunSet"
              }`}
            ></div>
            <dl className={timeTable}>
              <dt>일출</dt>
              <dd className={timeValue}>
                <time dateTime="HH:mm">{info.inc}</time>
              </dd>
              <dt>일몰</dt>
              <dd className={timeValue}>
                <time dateTime="HH:mm">{info.set}</time>
              </dd>
            </dl>
          </div>

          {apiDown && (
            <p className={offerArea}>
              현재 한국천문연구원 서버 복구 중으로 임시 데이터를 사용 중입니다.
            </p>
          )}
        </>
      )}
    </div>
  );
}

function Sunset(props: ISunsetInfoProps) {
  return (
    <>
      <Title text="일출일몰" />
      <SunsetInfo status={props.status} />
      <p className="offer_area">
        <a href="https://www.kasi.re.kr/" target="_blank" rel="noreferrer">
          한국천문연구원
        </a>{" "}
        발표 (복구 중일 경우 임시데이터 대체)
      </p>
    </>
  );
}

export default Sunset;
