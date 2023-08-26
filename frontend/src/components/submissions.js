import { testcasesdata } from "../../Dummy_Data";
import { useState, useEffect } from "react";

function SubmitCode(props) {
  const { clickedButton } = props;
  const [testCaseClicked, setTestCaseClicked] = useState(0);

  useEffect(() => {
    // Reset testCaseClicked with a minimal delay
    setTestCaseClicked(0);
    // Clean up the timer if component unmounts
  }, [clickedButton]);
  return (
    <>
      <div id="font_proxima" className="mb-10">
        <div className="h-[450px] bg-[#161616] mx-5 pl-5 pt-5">
          <div className="flex gap-10 items-center">
            <h1 className="text-[#1ba94c] text-2xl font-semibold">
              Accepted !
            </h1>
            <p className="text-[#c1bbb3] font-semibold">Runtime: 0ms</p>
          </div>
          <div className="flex flex-wrap pt-5 gap-7">
            {testcasesdata[clickedButton].testcases.map((item, index) => (
              <button
                key={index}
                className="bg-[#424242] px-3 py-1 rounded-lg text-[#c1bbb3] hover:text-white"
                onClick={() => {
                  setTestCaseClicked(index);
                }}
                style={{
                  color: testCaseClicked === index && "#ffffff",
                }}
              >
                case {index + 1}
              </button>
            ))}
          </div>
          {testcasesdata[clickedButton].testcases[testCaseClicked]
            ?.compileMessage === undefined ? (
            <div>Loading...</div>
          ) : (
            <div>
              <div className="pt-5">
                <h1 className="text-[#c1bbb3] font-semibold">Input</h1>
                <div className="bg-[#424242] py-4 mr-5 pl-3 text-[#c1bbb3] mt-2">
                  {
                    testcasesdata[clickedButton].testcases[testCaseClicked]
                      .input
                  }
                </div>
              </div>
              <div className="pt-5">
                <h1 className="text-[#c1bbb3] font-semibold">Output</h1>
                <div className="bg-[#424242] py-4 mr-5 pl-3 text-[#c1bbb3] mt-2">
                  {
                    testcasesdata[clickedButton].testcases[testCaseClicked]
                      .output
                  }
                </div>
              </div>
              <div className="pt-5">
                <h1 className="text-[#c1bbb3] font-semibold">
                  Expected Output
                </h1>
                <div className="bg-[#424242] py-4 mr-5 pl-3 text-[#c1bbb3] mt-2">
                  {
                    testcasesdata[clickedButton].testcases[testCaseClicked]
                      .expectedOutput
                  }
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SubmitCode;
