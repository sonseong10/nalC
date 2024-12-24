import axios from "axios";

const NaverApi = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application.json",
    "x-ncp-apigw-api-key-id": import.meta.env.VITE_APP_NAVER_CLIENT_ID || "",
    "x-ncp-apigw-api-key": import.meta.env.VITE_APP_NAVER_CLIENT_SECRET || "",
  },
});

const WeatherApi = axios.create({
  baseURL: "http://apis.data.go.kr",
  params: {
    serviceKey: import.meta.env.VITE_APP_WEATHER_KEY || "",
  },
});

export { NaverApi, WeatherApi };