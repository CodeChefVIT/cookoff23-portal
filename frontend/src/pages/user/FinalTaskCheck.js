import React, { useEffect } from "react";
import Cookies from "js-cookie";

const CompleteTest = () => {
  const handleButtonClick = () => {
    localStorage.removeItem("codeData");
  };

  const codeData = JSON.parse(localStorage.getItem("codeData")) || {};
  const codeDataLength = Object.keys(codeData).length;

  console.log("Length of codeData:", codeDataLength);

  const computeArrayValue = (array) => {
    let sum = 0;

    for (let i = 2; i < array.length; i++) {
      if (!array[i]) {
        sum += 1;
      }
    }
    if ((array[0] === array[1]) === true) {
      sum += 1;
    }

    return sum;
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-[#D9D9D999] text-center">
        <div className="w-[60vw] py-[11px] bg-[#1F1F1F] rounded-[10px] text-[27px] font-semibold text-center ring-2 ring-[#D9D9D9] ring-offset-4 hover:ring-offset-[5px] ring-offset-[#0D0D0D]">
          No of questions submitted:&nbsp;&nbsp; {codeDataLength}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-10">
          {Array(codeDataLength)
            .fill()
            .map((_, index) => {
              const taskCompletionCookieName = `${index + 10}`;
              const taskCompletionJSON = Cookies.get(taskCompletionCookieName);
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
                  {taskCompletionValue}
                </div>
              );
            })}
        </div>
        <button
          className="text-[#f3ededd8] text-[20px] hover:text-[21px] ease-in-out duration-100 font-semibold ring-2 ring-[#1F1F1F] py-1 px-5 rounded-full ring-offset-8 hover:ring-offset-[8px] bg-[#16a34a] ring-offset-[#16a34a] mt-10 mr-4"
          onClick={handleButtonClick}
        >
          Complete Test
        </button>
      </div>
    </div>
  );
};

export default CompleteTest;
