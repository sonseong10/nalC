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
  const { info, setSunInfo } = useWeatherStore(
    useShallow((state) => ({
      info: state.info,
      setSunInfo: state.setSunInfo,
    }))
  );

  useEffect(() => {
    if (status) {
      const loaction =
        "/B090041/openapi/service/RiseSetInfoService/getLCRiseSetInfo";

      const api = async () => {
        const params = {
          locdate: moment().format("YYYYMMDD"),
          longitude: status.longitude,
          latitude: status.latitude,
          dnYn: "Y",
        };
        setLoading(true);
        await WeatherApi.get(loaction, { params })
          .then((res) => {
            const item = res.data?.response?.body?.items?.item;
            setSunInfo({
              inc: moment(item?.sunrise.trim(), "HHmm").format("HH:mm"),
              set: moment(item?.sunset.trim(), "HHmm").format("HH:mm"),
            });
          })
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      };
      api();
    }
  }, [setSunInfo, status]);

  const rotateDeg = useMemo(() => {
    if (!info?.inc || !info?.set) return { dot: 0, bar: 45 };

    const GAP = 45;

    const now = moment();
    const sunrise = moment(info.inc, "HH:mm");
    const sunset = moment(info.set, "HH:mm");

    // 자정 넘는 경우 보정
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
        </a>
        발표
      </p>
    </>
  );
}

export default Sunset;
