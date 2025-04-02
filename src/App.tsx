import { useEffect, useState } from "react";
import { container } from "./styles/app.css.ts";
import NowWeather from "./components/now/now.tsx";
import Header from "./components/layout/header.tsx";
import LocalPostion from "./components/position/localPostition.tsx";
// import Hourly from "./components/hourly/hourly.tsx";

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

      {/* <div className={container}>
        <Hourly />
      </div> */}
    </>
  );
}

export default App;
