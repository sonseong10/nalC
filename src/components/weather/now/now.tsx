import moment from "moment";
import { useNowWeatherInfo } from "./nowHook";
import {
  weatherGroup,
  tmp,
  infoGroup,
  logo,
  infoDesc,
  weatherImage,
  loadingBox,
} from "./now.css";
import { flexRow } from "../../../styles/app.css";
import logoImg from "../../assets/koreaMeteorological.png";
import LocalPostion from "./position/localPostition";
import useWeatherStore from "../../../store";
import { useShallow } from "zustand/shallow";
import Shimmer from "../../layout/shimmer/Shimmer";

interface NowWeatherProps {
  status: {
    latitude: number;
    longitude: number;
  } | null;
}

function PositionWeather({ status }: NowWeatherProps) {
  const { toDayInfo } = useNowWeatherInfo(status);
  const { info } = useWeatherStore(
    useShallow((state) => ({ info: state.info }))
  );

  return (
    <>
      {toDayInfo?.length <= 0 ? (
        <div className={loadingBox}>
          <Shimmer />
          <span>정보 불러오는 중</span>
        </div>
      ) : (
        <>
          <div className={weatherGroup}>
            <div>
              <img
                className={weatherImage}
                src={`https://ssl.pstatic.net/static/weather/image/icon_weather/ico_animation_wt${
                  moment().isAfter(moment(info.set, "HH:mm")) ? "2" : "1"
                }.svg`}
                alt="맑음"
              />
            </div>
            {toDayInfo?.map(
              (e, index) =>
                e.category === "T1H" && (
                  <strong key={index} className={tmp}>
                    {e.fcstValue}°
                  </strong>
                )
            )}
          </div>

          <div>
            <dl className={infoGroup}>
              <div className={flexRow}>
                <dt>업데이트시간</dt>
                <dd className={infoDesc}>
                  {moment(toDayInfo?.[0].baseDate).format("YYYY.MM.DD.")}
                  {toDayInfo?.[0].baseTime.replace(/(\d{2})(\d{2})/, "$1:$2")}
                </dd>
              </div>
              <div className={flexRow}>
                <dt>정보제공</dt>
                <dd className={infoDesc}>
                  <figure>
                    <img className={logo} src={logoImg} alt="한국기상청로고" />
                    <figcaption></figcaption>
                  </figure>
                </dd>
              </div>
            </dl>
          </div>
        </>
      )}
    </>
  );
}

function NowWeather({ status }: NowWeatherProps) {
  return (
    <div>
      {status ? (
        <>
          <LocalPostion status={status} />

          <PositionWeather status={status} />
        </>
      ) : (
        <div className={loadingBox}>
          <Shimmer />
          <p>
            현재 위치를 탐색 할 수 없습니다.
            <br />
            위치서비스를 활성화 하거나, 지역을 설정해주세요.
          </p>
        </div>
      )}
    </div>
  );
}

export default NowWeather;
