import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createSunsetSlice, SunsetSlice } from "./sunsetStore";

type RootState = SunsetSlice;

const useWeatherStore = create<RootState>()(
  import.meta.env.VITE_APP_NODE_ENV === "production"
    ? (...arg) => ({
        ...createSunsetSlice(...arg),
      })
    : devtools(
        (...arg) => ({
          ...createSunsetSlice(...arg),
        }),
        { name: "WeatherStore" }
      )
);

export default useWeatherStore;
