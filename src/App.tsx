import { useEffect, useState } from "react";
import {
  container,
  inputBox,
  header,
  flexRow,
  searchBtn,
} from "./styles/app.css.ts";
import NowWeather from "./components/now/now.tsx";

function App() {
  const [status, setLocation] = useState<null | {
    longitude: number;
    latitude: number;
  }>(null);

  // const [toDayInfo, setToDayInfo] = useState<Array<any>>([]);

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

  // const timeWeather = async () => {
  //   if (!status) {
  //     return;
  //   }

  //   const info = timePicker();
  //   const rs = dfs_xy_conv("toXY", status.latitude, status.longitude);
  //   await WeatherApi.get(`/1360000/VilageFcstInfoService_2.0/getVilageFcst`, {
  //     params: {
  //       pageNo: 1,
  //       numOfRows: 260,
  //       dataType: "JSON",
  //       base_date: info.date,
  //       base_time: info.time,
  //       nx: rs.x,
  //       ny: rs.y,
  //     },
  //   }).then((json) => {
  //     const temp = json.data.response.body.items.item;

  //     //   .filter((e) => e);

  //     console.log(temp);
  //   });
  // };

  useEffect(() => {
    getLocation();
  }, [status?.latitude]);

  return (
    <>
      <header className={header}>
        <div>
          <button>메뉴</button>
        </div>

        <div className={flexRow}>
          <input
            className={inputBox}
            placeholder="지역검색 (ㅇㅇ시, ㅇㅇ구, ㅇㅇ동)"
          />

          <button className={searchBtn}>검색</button>
        </div>
      </header>

      <div className={container}>
        <NowWeather status={status ? status : undefined} />
      </div>

      <div className={container}>
        <h2>시간별 날씨</h2>

        <div></div>
      </div>
    </>
  );
}

export default App;
