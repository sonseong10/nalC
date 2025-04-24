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
} from "./sunset.css";
import moment from "moment";
import { useEffect } from "react";
import { WeatherApi } from "../../utils/HTTP";

interface ISunsetInfoProps {
  status: {
    latitude: number;
    longitude: number;
  } | null;
}

function SunsetInfo({ status }: ISunsetInfoProps) {
  useEffect(() => {
    if (!status) {
      //
    } else {
      const api = async () => {
        const params = {
          serviceKey: process.env.VITE_APP_WEATHER_KEY,
          locdate: moment().format("YYYYMMDD"),
          longitude: status.longitude,
          latitude: status.latitude,
          dnYn: "Y",
        };
        await WeatherApi.get(
          "/B090041/openapi/service/RiseSetInfoService/getLCRiseSetInfo",
          { params }
        )
          .then((res) => {
            if (res) {
              console.log(res.data?.response?.body?.items?.item);
            }
          })
          .catch((error) => console.error(error));
      };
      api();
    }
  }, [status]);

  return (
    <div className={box}>
      <div className={sunChart}>
        <div className={progressBar}>
          <div className={currentBar}>
            <div className={bar}></div>
          </div>
        </div>
      </div>

      <div className={sunInfo}>
        <div className={iconArea}></div>

        <dl className={timeTable}>
          <dt>일출</dt>
          <dd className={timeValue}>
            <time dateTime="HH:mm">05:50</time>
          </dd>
          <dt>일몰</dt>
          <dd className={timeValue}>
            <time dateTime="HH:mm">19:20</time>
          </dd>
        </dl>
      </div>
    </div>
  );
}

function Sunset(props: ISunsetInfoProps) {
  return (
    <>
      <Title text="일출일몰" />

      <SunsetInfo status={props.status} />

      <p className="offer_area">
        <a href="https://www.kasi.re.kr/" target="_blank">
          한국천문연구원
        </a>
        발표
      </p>
    </>
  );
}
export default Sunset;
