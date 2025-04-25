import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createSunsetSlice, SunsetSlice } from "./sunsetStore";

type RootState = SunsetSlice;

const useWeatherStore = create<RootState>()(
  process.env.NODE_ENV === "production"
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
