import React from "react";

const CompleteTest = () => {
  const handleButtonClick = () => {
    localStorage.removeItem("codeData");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-[#D9D9D999] text-center">
        <div className="w-[60vw] py-[11px] bg-[#1F1F1F] rounded-[10px] text-[27px] font-semibold text-center ring-2 ring-[#D9D9D9] ring-offset-4 hover:ring-offset-[5px] ring-offset-[#0D0D0D]">
          No of questions submitted:&nbsp;&nbsp; 8
        </div>
        <div className="grid grid-cols-3 gap-4 mt-10">
          {Array(8)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="w-[15vw] py-[11px] bg-[#1F1F1F] rounded-[10px] text-[17px] font-semibold text-center ring-2 ring-[#D9D9D9] ring-offset-4 hover:ring-offset-[5px] ring-offset-[#0D0D0D] m-2"
              >
                No of Tasks completed for Q{index + 1}:&nbsp;&nbsp; 8
              </div>
            ))}
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
