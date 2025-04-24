import { useEffect, useState } from "react";
import { container, flexRow, footer, main } from "./styles/app.css.ts";
import NowWeather from "./components/now/now.tsx";
import Header from "./components/layout/header.tsx";
import HourlySection from "./components/hourly/Hourly.tsx";
import Sunset from "./components/sunset/Sunset.tsx";

const useInitLocation = () => {
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

  return { status };
};

function App() {
  const { status } = useInitLocation();

  const layout = [
    <NowWeather status={status} />,
    <HourlySection status={status} />,
    <Sunset status={status} />,
  ];

  return (
    <main className={main}>
      <Header />

      {layout.map((component, index) => {
        return (
          <div className={container} key={index}>
            {component}
          </div>
        );
      })}

      <footer className={footer}>
        <dl className={flexRow}>
          <dt>제작자</dt>
          <dd>
            <a href="https://github.com/sonseong10" target="_blank">
              Son seongyeol
            </a>
          </dd>
          <dt>제작기간</dt>
          <dd>
            <span>2025 ~</span>
          </dd>
        </dl>
      </footer>
    </main>
  );
}

export default App;
