import Title from "../layout/Title";
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
import { useEffect, useMemo } from "react";
import { WeatherApi } from "../../utils/HTTP";
import useWeatherStore from "../../store/index";
import { useShallow } from "zustand/shallow";

interface ISunsetInfoProps {
  status: {
    latitude: number;
    longitude: number;
  } | null;
}

function SunsetInfo({ status }: ISunsetInfoProps) {
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
        await WeatherApi.get(loaction, { params })
          .then((res) => {
            const item = res.data?.response?.body?.items?.item;
            setSunInfo({
              inc: moment(item?.sunrise.trim(), "HHmm").format("HH:mm"),
              set: moment(item?.sunset.trim(), "HHmm").format("HH:mm"),
            });
          })
          .catch((error) => console.error(error));
      };
      api();
    }
  }, [setSunInfo, status]);

  const rotateDeg = useMemo(() => {
    const now = moment();
    const startOfDay = moment().startOf("day");
    const endOfDay = moment().endOf("day");

    const totalMinutes = endOfDay.diff(startOfDay, "minutes");
    const passedMinutes = now.diff(startOfDay, "minutes");

    const progress = Math.min(Math.max(passedMinutes / totalMinutes, 0), 1);

    return {
      dot: progress * 140,
      bar: progress * 230,
    };
  }, []);

  return (
    <div className={box}>
      {!info ? (
        <></>
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
        </a>{" "}
        발표
      </p>
    </>
  );
}

export default Sunset;
