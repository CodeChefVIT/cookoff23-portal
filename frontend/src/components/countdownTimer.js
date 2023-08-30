import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';

function CountdownTimer() {
  const initialTime = 2 * 60 * 60; // 2 hours in seconds
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  useEffect(() => {
    const storedTime = Cookies.get('timerTime');
    if (storedTime !== undefined) {
      setTimeRemaining(parseInt(storedTime, 10));
    } else {
      setTimeRemaining(initialTime);
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      } else {
        setTimeRemaining(initialTime);
      }
    }, 1000);

    const handleBeforeUnload = () => {
      Cookies.set('timerTime', timeRemaining.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [timeRemaining]);

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
      <p>{formatTime(timeRemaining)}</p>
    </div>
  );
}

export default CountdownTimer;
