import { useEffect, useState } from "react";
import { NaverApi } from "./utils/HTTP";

function App() {
  const [status, setLocation] = useState<null | string>(null);

  const temp = async () => {
    await NaverApi.get(`/map-reversegeocode`, {
      method: "GET",
      params: {
        coords: "126.73,37.54",
        orders: "admcode",
        output: "json",
      },
    }).then((json) => {
      console.log(json);
    });
  };
  useEffect(() => {
    temp();
  }, []);

  function getLocation() {
    // Geolocation API 지원 여부 확인
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setLocation(
            `위도: ${latitude}, 경도: ${longitude}, 정확도: ${accuracy}미터`
          );
        },
        (error) => {
          setLocation(`위치 정보를 가져올 수 없습니다: ${error.message}`);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setLocation("브라우저가 위치 서비스를 지원하지 않습니다.");
    }
  }

  return (
    <>
      <p>{status}</p>
      <button onClick={getLocation}></button>
    </>
  );
}

export default App;
