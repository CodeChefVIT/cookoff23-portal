import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import useTimerStore from "@/store/timeProvider";

function CountdownTimer() {
  const [initialTime, setInitialTime] = useState(() => {
    const storedTime = localStorage.getItem('timerTime');
    return storedTime ? parseInt(storedTime, 10) : useTimerStore.getState().Time;
  });

  const updateTimer = (newTime) => {
    setInitialTime(newTime);
    localStorage.setItem('timerTime', newTime.toString());
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        localStorage.setItem('timerTime', initialTime.toString());
      } else {
        const storedTime = localStorage.getItem('timerTime');
        if (storedTime !== null) {
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
        updateTimer(initialTime - 1);
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
