import { create } from "zustand";

import { COUNTERS } from "./consts";

interface ArrayState {
  pomodoro: number;
  break: number;
  long_break: number;
  [key: string]: number;
}

interface Store {
  counterType: number;
  actualCounterType: string;
  changeActualType: (type: string) => void;
  setCounterType: (counter: (typeof COUNTERS)[keyof typeof COUNTERS]) => void;
  counterState: string;
  changeCounterState: (newState: string) => void;
  arrayState: ArrayState;
  updateArrayState: (key: keyof ArrayState, value: number) => void;
}

export const store = create<Store>((set) => ({
  counterType: COUNTERS.POMODORO,
  actualCounterType: "pomodoro",
  changeActualType: (type) => set(() => ({ actualCounterType: type })),
  setCounterType: (counter) =>
    set(() => ({
      counterType: counter,
    })),
  counterState: "start",
  changeCounterState: (newState) => set(() => ({ counterState: newState })),
  arrayState: {
    pomodoro: 0,
    break: 0,
    long_break: 0,
  },
  updateArrayState: (key, value) =>
    set((state) => ({
      arrayState: {
        ...state.arrayState,
        [key]: value,
      },
    })),
}));
