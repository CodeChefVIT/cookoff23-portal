import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import useTimerStore from "@/store/timeProvider";

function CountdownTimer() {
  const initialTime = useTimerStore((state) => state.Time);
  const updateTimer = (newTime) => {
    useTimerStore.setState({ Time: newTime });
    Cookies.set('timerTime', newTime.toString());
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        Cookies.set('timerTime', initialTime.toString());
      } else {
        const storedTime = Cookies.get('timerTime');
        if (storedTime !== undefined) {
          updateTimer(parseInt(storedTime, 10));
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [initialTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (initialTime > 0) {
        updateTimer(useTimerStore.getState().Time - 1);
      } else {
        updateTimer(2 * 60 * 60);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [initialTime]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="w-[100px] mx-9 bg-[#4d4d4d] rounded-xl text-center py-1 text-[#C1BBB3] font-semibold text-lg"
      id="font_proxima"
    >
      <p>{formatTime(initialTime)}</p>
    </div>
  );
}

export default CountdownTimer;
