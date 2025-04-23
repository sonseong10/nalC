import moment from "moment";
import { useNowWeatherInfo } from "./nowHook";
import {
  weatherGroup,
  tmp,
  infoGroup,
  logo,
  infoDesc,
  weatherImage,
} from "./now.css";
import { flexRow } from "../../styles/app.css";
import logoImg from "../../assets/koreaMeteorological.png";
import LocalPostion from "../position/localPostition";

interface NowWeatherProps {
  status: {
    latitude: number;
    longitude: number;
  } | null;
}

function PositionWeather({ status }: NowWeatherProps) {
  const { toDayInfo } = useNowWeatherInfo(status);

  return (
    <>
      {toDayInfo?.length <= 0 ? (
        <span>정보 불러오는 중</span>
      ) : (
        <div>
          <div>
            <div className={weatherGroup}>
              <img
                className={weatherImage}
                src="https://ssl.pstatic.net/static/weather/image/icon_weather/ico_animation_wt1.svg"
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
        </div>
      )}
    </>
  );
}

function NowWeather({ status }: NowWeatherProps) {
  return (
    <div>
      <LocalPostion status={status} />
      {status ? (
        <PositionWeather status={status} />
      ) : (
        <span>
          현재 위치를 탐색 할 수 없습니다. 위치서비스를 활성화 하거나, 검색어를
          입력해 주세요.
        </span>
      )}
    </div>
  );
}

export default NowWeather;
