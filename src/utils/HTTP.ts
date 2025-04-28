import axios from "axios";

const KakaoApi = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${
      import.meta.env.VITE_APP_NAVER_CLIENT_SECRET || ""
    }`,
  },
});

const WeatherApi = axios.create({
  baseURL: "https://apis.data.go.kr",
  params: {
    serviceKey: import.meta.env.VITE_APP_WEATHER_KEY || "",
  },
});

export { KakaoApi, WeatherApi };