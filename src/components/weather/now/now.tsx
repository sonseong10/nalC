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
import logoImg from "../../../assets/koreaMeteorological.png";
import LocalPostion from "./position/localPostition";
import useWeatherStore from "../../../store";
import { useShallow } from "zustand/shallow";
import Shimmer from "../../layout/shimmer/Shimmer";
import Title from "../../layout/Title";

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

const weatherCodeHandle = (): number => {
  const PTYinfo = toDayInfo.find((info) => info.category === "PTY");
  const SKYinfo = toDayInfo.find((info) => info.category === "SKY");

  if (!PTYinfo || !SKYinfo) return -1; // 데이터 부족 시 에러 코드

  const ptyCode = Number(PTYinfo.fcstValue);
  const skyCode = Number(SKYinfo.fcstValue);
  const sunsetTime = moment(info.set, "HH:mm");
  const isAfterSunset = moment().isAfter(sunsetTime);

  // 일몰 후에는 강수(PTY) 우선, 그 후 하늘 상태(SK)
  if (isAfterSunset) {
    if (ptyCode !== 0) {
      // 강수 있음
      switch (ptyCode) {
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
    switch (skyCode) {
      case 3:
        return 6; // 흐림
      case 4:
        return 7; // 매우 흐림
      case 1:
      default:
        return 2; // 맑음
    }
  }

  if (ptyCode !== 0) {
    switch (ptyCode) {
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
  switch (skyCode) {
    case 3:
      return 5; // 흐림
    case 4:
      return 7; // 매우 흐림
    case 1:
    default:
      return 1; // 맑음
  }
};

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
              src={`https://ssl.pstatic.net/static/weather/image/icon_weather/ico_animation_wt${weatherCodeHandle()}.svg`}
              alt="기상상태"
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
    <>
      <Title text="현재날씨" className="hidden" />

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
    </>
  );
}

export default NowWeather;
