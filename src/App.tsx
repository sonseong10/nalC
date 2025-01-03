import { useEffect, useState } from "react";
import { container } from "./styles/app.css.ts";
import NowWeather from "./components/now/now.tsx";
import Header from "./components/layout/header.tsx";
import Hourly from "./components/hourly/hourly.tsx";

function App() {
  const [status, setLocation] = useState<null | {
    longitude: number;
    latitude: number;
  }>(null);

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
  }, []);

  return (
    <>
      <Header />

      <div className={container}>
        <NowWeather status={status ? status : undefined} />
      </div>

      <div className={container}>
        <Hourly />
      </div>
    </>
  );
}

export default App;
