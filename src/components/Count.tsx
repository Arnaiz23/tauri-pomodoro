import { useEffect } from "react";

import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/api/notification";

import { store } from "../store";
import { OPTIONS, COUNTERS } from "../consts";

export default function Count() {
  const getTime = (count: number) => {
    const minutes = Math.floor(count / 60);
    const seconds = ("0" + (count % 60)).slice(-2);
    return `${minutes}:${seconds}`;
  };

  const {
    counterType,
    counterState,
    setCounterType,
    changeCounterState,
    actualCounterType,
    updateArrayState,
    arrayState,
    changeActualType,
  } = store();

  useEffect(() => {
    if (counterState === OPTIONS.STOP) {
      const timeout = setTimeout(async () => {
        const newTime = counterType - 1;
        if (newTime < 0) {
          let permissionGranted = await isPermissionGranted();
          if (!permissionGranted) {
            const permission = await requestPermission();
            permissionGranted = permission === "granted";
          }
          if (permissionGranted) {
            sendNotification({
              title: actualCounterType,
              body: `The ${actualCounterType} is over!!!`,
            });
          }

          if (actualCounterType === "pomodoro") {
            console.log({
              state: arrayState.pomodoro,
              a: arrayState.pomodoro % 5 === 0,
            });
            if (arrayState.pomodoro % 5 === 0 && arrayState.pomodoro > 0) {
              changeActualType("long_break");
              setCounterType(COUNTERS.LONG_BREAK);
            } else {
              changeActualType("break");
              setCounterType(COUNTERS.BREAK);
            }
          } else if (actualCounterType === "break") {
            changeActualType("pomodoro");
            setCounterType(COUNTERS.POMODORO);
            changeCounterState(OPTIONS.START);
          } else {
            changeActualType("pomodoro");
            setCounterType(COUNTERS.POMODORO);
            changeCounterState(OPTIONS.START);
          }

          updateArrayState(
            actualCounterType,
            arrayState[actualCounterType] + 1,
          );
          return;
        }
        setCounterType(newTime);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [counterType, counterState]);

  return (
    <section className="w-full grid place-items-center h-full">
      <p className="text-9xl font-mono">{getTime(counterType)}</p>
    </section>
  );
}
