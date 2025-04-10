import { useEffect, useState } from "react";
import { container } from "./styles/app.css.ts";
import NowWeather from "./components/now/now.tsx";
import Header from "./components/layout/header.tsx";
import LocalPostion from "./components/position/localPostition.tsx";
import Hourly from "./components/hourly/hourly.tsx";

function App() {
  const [status, setLocation] = useState<null | {
    longitude: number;
    latitude: number;
  }>(null);

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
          switch (error.code) {
            case 1:
              console.warn("사용자가 거부");
              break;
            case 2:
              console.error("시스템오류");
              break;
            case 3:
              console.warn("타임아웃");
              break;
          }
          setLocation({
            latitude: 37.575,
            longitude: 126.973,
          }); // 경북궁 좌표;
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 30000,
        }
      );
    } else {
      console.error("위치서비스 브라우저 미지원");
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <Header />

      <div className={container}>
        <LocalPostion status={status ? status : undefined} />

        <NowWeather status={status ? status : undefined} />
      </div>

      <div className={container}>
        <Hourly status={status ? status : undefined} />
      </div>
    </>
  );
}

export default App;
