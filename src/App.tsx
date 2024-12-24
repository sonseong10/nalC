import { useEffect, useState } from "react";
import { WeatherApi } from "./utils/HTTP";
import moment from "moment";
import dfs_xy_conv from "./utils/position";
import { container } from "./styles/app.css.ts";

function App() {
  const [status, setLocation] = useState<null | {
    longitude: number;
    latitude: number;
  }>(null);

  const [toDayInfo, setToDayInfo] = useState<Array<any>>([]);

  // const initLoction = async () => {
  //   if (status) {
  //     await NaverApi.get(`/map-reversegeocode`, {
  //       method: "GET",
  //       params: {
  //         coords: `${status?.longitude},${status?.latitude}`,
  //         orders: "admcode",
  //         output: "json",
  //       },
  //     }).then((json) => {
  //       console.log(json);
  //     });
  //   }
  // };

  function getLocation() {
    // Geolocation API 지원 여부 확인
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            longitude,
            latitude,
          });
        },
        (error) => {
          alert(error);
          setLocation(null);
        }, //
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setLocation(null);
    }
  }

  const timePicker = () => {
    const info: { time: undefined | string; date: undefined | string } = {
      time: undefined,
      date: undefined,
    };
    const currentTime = moment().format("HHmm");
    info.date = moment().format("YYYYMMDD").toString();
    if (moment(currentTime).isBetween("1200", "0215")) {
      info.date = moment().subtract(1, "days").toString();
      info.time = "2300";
    } else if (moment(currentTime).isBetween("0215", "0515")) {
      info.time = "0100";
    } else if (moment(currentTime).isBetween("0515", "0815")) {
      info.time = "0400";
    } else if (moment(currentTime).isBetween("0815", "1115")) {
      info.time = "0700";
    } else if (moment(currentTime).isBetween("1115", "1415")) {
      info.time = "1000";
    } else if (moment(currentTime).isBetween("1415", "1715")) {
      info.time = "1300";
    } else if (moment(currentTime).isBetween("1715", "2015")) {
      info.time = "1600";
    } else if (moment(currentTime).isBetween("2015", "2315")) {
      info.time = "1900";
    } else {
      info.time = "2300";
    }

    return info;
  };

  const timeWeather = async () => {
    if (!status) {
      return;
    }

    const info = timePicker();
    const rs = dfs_xy_conv("toXY", status.latitude, status.longitude);
    await WeatherApi.get(`/1360000/VilageFcstInfoService_2.0/getVilageFcst`, {
      params: {
        pageNo: 1,
        numOfRows: 260,
        dataType: "JSON",
        base_date: info.date,
        base_time: info.time,
        nx: rs.x,
        ny: rs.y,
      },
    }).then((json) => {
      const temp = json.data.response.body.items.item;

      //   .filter((e) => e);

      console.log(temp);
    });
  };

  const nowWeather = async () => {
    if (!status) {
      return;
    }

    const info = timePicker();
    const rs = dfs_xy_conv("toXY", 37.5412874, 126.7376916);
    await WeatherApi.get(`/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst`, {
      params: {
        pageNo: 1,
        numOfRows: 60,
        dataType: "JSON",
        base_date: info.date,
        base_time: info.time,
        nx: rs.x,
        ny: rs.y,
      },
    }).then((res) => {
      const array = res.data.response.body.items.item
        .map((data) => {
          if (data.fcstTime === `1800`) {
            return {
              ...data,
            };
          }
        })
        .filter((e) => e);
      setToDayInfo(array);
    });
  };

  useEffect(() => {
    getLocation();
    nowWeather();
  }, [status?.latitude]);

  return (
    <div className={container}>
      <div>
        <input placeholder="지역단체명까지 검색가능합니다." />
        <button>검색</button>
      </div>

      <h2>
        {moment().format("YYYY.MM.DD")}
        <br /> oo동 오늘의 날씨
      </h2>

      <div>
        {status ? (
          <div>
            {toDayInfo.length <= 0 ? (
              <></>
            ) : (
              <div>
                <p>
                  {toDayInfo.map((e, index) =>
                    e.category === "T1H" ? (
                      <strong key={index}>{e.fcstValue}°C</strong>
                    ) : (
                      <></>
                    )
                  )}
                </p>

                <p>
                  {toDayInfo.map((e, index) =>
                    e.category === "RN1" ? (
                      <span key={index}>{e.fcstValue}</span>
                    ) : (
                      <></>
                    )
                  )}
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

      <div>
        <h2>시간별 날씨</h2>

        <div></div>
      </div>
    </div>
  );
}

export default App;
