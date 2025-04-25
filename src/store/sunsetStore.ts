import type { StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export interface SunInfo {
  inc?: string;
  set?: string;
}

export interface SunsetSlice {
  info: SunInfo;
  setSunInfo: (info: SunInfo) => void;
}

export const createSunsetSlice: StateCreator<
  SunsetSlice,
  [],
  [["zustand/devtools", never]],
  SunsetSlice
> = devtools((set) => ({
  info: {
    inc: undefined,
    set: undefined,
  },
  setSunInfo: (info) => set(() => ({ info }), false, "setSunMoveInfo"),
}));
