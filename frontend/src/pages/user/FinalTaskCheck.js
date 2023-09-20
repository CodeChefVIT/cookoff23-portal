import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import RefreshToken from "@/utils/RefreshToken";
import Cookies from "js-cookie";
import useTimerStore from "@/store/timeProvider";

const CompleteTest = () => {
  const router = useRouter();
  const [initialTime, setInitialTime] = useState(() => {
    const storedTime = localStorage.getItem("timerTime");
    return storedTime
      ? parseInt(storedTime, 10)
      : useTimerStore.getState().Time;
  });
  useEffect(() => {
    const handleBackButton = (e) => {
      e.preventDefault();
      alert("Cannot go back to the test.");
      window.history.pushState(null, null, window.location.pathname);
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);
  async function handleButtonClick() {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    const updateTimer = (newTime) => {
      setInitialTime(newTime);
      localStorage.setItem("timerTime", newTime.toString());
    };
    updateTimer(2 * 60 * 60);
    await RefreshToken();
    localStorage.removeItem("codeData");

    router.push("/user");
  }
  let codeData = {};

  if (typeof window !== "undefined") {
    try {
      codeData = JSON.parse(localStorage.getItem("codeData")) || {};
    } catch (error) {
      console.error("Error parsing codeData:", error);
    }
  }

  const codeDataLength = Object.keys(codeData).length;

  const computeArrayValue = (array) => {
    let sum = 0;
    if (array.length === 0 || array === null || array === undefined) {
      return 0;
    }
    for (let i = 2; i < array.length; i++) {
      if (!array[i]) {
        sum += 1;
      }
    }
    if (!array[0] && !array[1]) {
      sum += 1;
    }

    return sum;
  };

  const length = Number(localStorage.getItem("QueArrlength"));
  console.log(length);

  return (
    <>
      <Navbar />
      <div className="min-h-[84vh] flex justify-center items-center">
        <div className="text-[#D9D9D999] text-center">
          <div className="w-[60vw] py-[11px] bg-[#1F1F1F] rounded-[10px] text-[27px] font-semibold text-center ring-2 ring-[#D9D9D9] ring-offset-4 hover:ring-offset-[5px] ring-offset-[#0D0D0D]">
            No of questions submitted:&nbsp;&nbsp; {codeDataLength}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {Array(5)
              .fill()
              .map((_, index) => {
                const taskCompletionCookieName = `${index + 10}`;
                const taskCompletionJSON = Cookies.get(
                  taskCompletionCookieName
                );
                const taskCompletion = taskCompletionJSON
                  ? JSON.parse(taskCompletionJSON)
                  : { error: [] };

                const errorArray = taskCompletion.error || [];

                const taskCompletionValue = computeArrayValue(errorArray);

                return (
                  <div
                    key={index}
                    className="w-[15vw] py-[11px] bg-[#1F1F1F] rounded-[10px] text-[17px] font-semibold text-center ring-2 ring-[#D9D9D9] ring-offset-4 hover:ring-offset-[5px] ring-offset-[#0D0D0D] m-2"
                  >
                    No of Tasks completed for Q{index + 1}:&nbsp;&nbsp;{" "}
                    {taskCompletionValue}/3
                  </div>
                );
              })}
          </div>
          <button
            className="text-[#f3ededd8] text-[20px] hover:text-[21px] ease-in-out duration-100 font-semibold ring-2 ring-[#1F1F1F] py-1 px-5 rounded-full ring-offset-8 hover:ring-offset-[8px] bg-[#16a34a] ring-offset-[#16a34a] mt-10 mr-4"
            onClick={handleButtonClick}
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    </>
  );
};

export default CompleteTest;
