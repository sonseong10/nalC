import { useEffect, useState } from "react";
import { container, flexRow, footer, main } from "./styles/app.css.ts";
import NowWeather from "./components/now/now.tsx";
import Header from "./components/layout/header.tsx";
import HourlySection from "./components/hourly/WeatherHourly.tsx";
import Sunset from "./components/sunset/Sunset.tsx";
import Popup from "./components/popup/Popup.tsx";
import Blind from "./components/layout/blind/Blind.tsx";
import { useBlindAction } from "./components/layout/blind/blind.ts";
import Forecast from "./components/forecast/Forecast.tsx";

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

function Footer() {
  return (
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
  );
}

function Main() {
  const { status } = useInitLocation();

  return (
    <main>
      <section className={container}>
        <NowWeather status={status} />
      </section>
      <section className={container}>
        <HourlySection status={status} />
      </section>
      <section className={container}>
        <Forecast />
      </section>
      <section className={container}>
        <Sunset status={status} />
      </section>
    </main>
  );
}

function App() {
  const { isShow, change } = useBlindAction();

  return (
    <div className={main}>
      <Header blindChange={change} />

      <Main />

      <Footer />

      <Blind isShow={isShow} change={change} />
      <Popup isShow={isShow} change={change} />
    </div>
  );
}

export default App;
