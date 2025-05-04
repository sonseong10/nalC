import { memo, useEffect, useState } from "react";
import { WeatherApi } from "../../../utils/HTTP";
import Title from "../../layout/Title";
import moment from "moment";
import { forecastList, info } from "./forecast.css";

const params = {
  pageNo: 1,
  numOfRows: 10,
  dataType: "JSON",
  stnId: 108,
};

const detachableText = (str: string) => {
  const newStr = str.replace(/곳/g, "");
  const rainStart = newStr.indexOf("* 예상 강수량");
  const rainInfo = newStr.slice(rainStart).trim();
  const mainText = newStr.slice(0, rainStart);

  const firstDetailIdx = mainText.indexOf("○");
  const summary = mainText.slice(6, firstDetailIdx).trim();
  const details = mainText
    .slice(firstDetailIdx)
    .split("○")
    .map((s) => {
      const new123 = s.replace(
        /\(([^)]+)\)/,
        (_, s) => `<span class='forecastBadge'>${s}</span>`
      );
      return new123.trim();
    })
    .filter(Boolean);
  return {
    rainInfo,
    summary,
    details,
  };
};

// const useInitForecast = () => {
//   const [forecast, setForecast] = useState<
//     | {
//         rainInfo: string;
//         summary: string;
//         details: string[];
//         time: number;
//         wn: string;
//         wr: string;
//       }
//     | undefined
//   >(undefined);
//   const init = async () => {
//     await WeatherApi.get<{
//       response: {
//         body: {
//           items: {
//             item: Array<{
//               stnId: string;
//               tmFc: number;
//               wfSv1: string;
//               wn: string;
//               wr: string;
//             }>;
//           };
//         };
//       };
//     }>("1360000/VilageFcstMsgService/getWthrSituation", {
//       params,
//     }).then((res) => {
//       const data = res?.data?.response?.body?.items?.item?.[0];
//       if (data) {
//         const result = {
//           ...detachableText(data.wfSv1),
//           time: data.tmFc,
//           wr: data.wr,
//           wn: data.wn,
//         };
//         setForecast(result);
//       }
//     });
//   };
//   useEffect(() => {
//     init();
//   }, []);

//   return { forecast };
// };

function ForecastInfo() {
  const [forecast, setForecast] = useState<
    | {
        rainInfo: string;
        summary: string;
        details: string[];
        time: number;
        wn: string;
        wr: string;
      }
    | undefined
  >(undefined);
  const init = async () => {
    await WeatherApi.get<{
      response: {
        body: {
          items: {
            item: Array<{
              stnId: string;
              tmFc: number;
              wfSv1: string;
              wn: string;
              wr: string;
            }>;
          };
        };
      };
    }>("1360000/VilageFcstMsgService/getWthrSituation", {
      params,
    }).then((res) => {
      const data = res?.data?.response?.body?.items?.item?.[0];
      if (data) {
        const result = {
          ...detachableText(data.wfSv1),
          time: data.tmFc,
          wr: data.wr,
          wn: data.wn,
        };
        setForecast(result);
      }
    });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      {forecast && (
        <div>
          <p dangerouslySetInnerHTML={{ __html: forecast.summary }}></p>
          <ol className={forecastList}>
            {forecast.details.map((item, index) => (
              <li
                className={info}
                key={index}
                dangerouslySetInnerHTML={{ __html: item }}
              ></li>
            ))}
          </ol>

          {forecast.wr.includes("없음") ? (
            <></>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: forecast.wr }}></p>
          )}

          <p className="offer_area">
            <a
              href="https://www.weather.go.kr/w/index.do"
              target="_blank"
              rel="noreferrer"
            >
              기상청
            </a>
            발표 기준{" "}
            {moment(forecast.time, "YYYYMMDDHHmm").format("YYYY.MM.DD. HH:mm")}
          </p>
        </div>
      )}
    </>
  );
}

function Forecast() {
  return (
    <>
      <Title text="기상예보" />

      <ForecastInfo />
    </>
  );
}

export default memo(Forecast);
