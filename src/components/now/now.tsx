import moment from "moment";
import { useNowWeatherInfo } from "./nowHook";

interface NowWeatherProps {
  status?: {
    latitude: number;
    longitude: number;
  };
}

function NowWeather({ status }: NowWeatherProps) {
  const { toDayInfo } = useNowWeatherInfo(status);
  return (
    <>
      <div>
        <h2>
          {moment().format("YYYY.MM.DD")}
          <br /> oo동 오늘의 날씨
        </h2>
        <button>구독</button>
      </div>

      <div>
        {status ? (
          <div>
            {toDayInfo.length <= 0 ? (
              <span>정보 불러오는 중</span>
            ) : (
              <div>
                <p>
                  {toDayInfo?.map(
                    (e, index) =>
                      e.category === "T1H" && (
                        <strong key={index}>{e.fcstValue}°C</strong>
                      )
                  )}
                </p>

                <p>
                  {toDayInfo?.map(
                    (e, index) =>
                      e.category === "RN1" && (
                        <span key={index}>{e.fcstValue}</span>
                      )
                  )}
                </p>

                <p>
                  업데이트시간:{" "}
                  {`${moment(toDayInfo?.[0].baseDate).format(
                    "YYYY.MM.DD"
                  )} ${toDayInfo?.[0].baseTime.replace(
                    /(\d{2})(\d{2})/,
                    "$1:$2"
                  )}`}
                </p>
              </div>
            )}
          </div>
        ) : (
          <span>
            현재 위치를 탐색 할 수 없습니다. 위치서비스를 활성화 하거나,
            검색어를 입력해 주세요.
          </span>
        )}
      </div>
    </>
  );
}

export default NowWeather;
