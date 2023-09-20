import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function SubmitCode(props) {
  const { clickedButton, submissionArray } = props;
  const containerRef = useRef(null);
  const [testCaseClicked, setTestCaseClicked] = useState(0);
  const subData = [
    "Run/Compilation error",
    "Time Limit Exceeded",
    "Wrong Output",
  ];

  useEffect(() => {
    setTestCaseClicked(0);
    containerRef.current.scrollIntoView();
  }, [clickedButton]);
  return (
    <>
      {submissionArray.error[0] ? (
        <div
          className="bg-[#1f1f1f] w-[95%] h-fit mb-10 mx-5"
          ref={containerRef}
        >
          <div className="pl-5 py-4">
            <h1 className="text-[#CC3333] text-2xl font-semibold">
              Compilation Error :(
            </h1>
          </div>
          <div className=" text-[#c1bbb3] px-5">
            <p className="bg-[#0D0D0D] py-1 pl-3">
              Check the compiler output, fix the error and try again.
            </p>
          </div>
          <div className="px-5 text-[#c1bbb3] py-3">
            <p className="font-semibold text-lg">Compile Message</p>
            <div className="bg-[#0D0D0D] py-2 pl-3 whitespace-pre">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {/* {runData[0].compile_output || runData[0].stderr} */}
                {submissionArray.message}
              </ReactMarkdown>
            </div>
          </div>
          <div className="text-[#c1bbb3] px-5">
            <p className="font-semibold text-lg">Exit Status</p>
            <div className="bg-[#0D0D0D] py-3 pl-3">
              {/* {runData[0].status_id} */}6
            </div>
          </div>
          <div>&nbsp;</div>
        </div>
      ) : (
        <div id="font_proxima" className="mb-8" ref={containerRef}>
          <div className="h-[350px] bg-[#161616] mx-5 pl-5 pt-5">
            <div className="flex gap-10 items-center">
              <h1 className="text-[#1ba94c] text-2xl font-semibold">
                Accepted !
              </h1>
            </div>
            <div className="flex-col mt-8">
              <div className="flex text-xl text-[#c1bbb3] font-semibold justify-around mr-5 my-7">
                <div>Task #</div>
                <div>Result</div>
              </div>
              {submissionArray.error.slice(-3).map((value, index) => {
                if (value) {
                  return (
                    <div
                      key={index}
                      className="flex text-xl text-[#EB3939] font-semibold justify-around my-7 ml-8"
                    >
                      <div>{index}</div>
                      <div className="flex-col ml-10">
                        <div>Not Accepted</div>
                        <div className="text-xs text-center">{subData[index]}</div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className="flex text-xl text-[#1ba94c] font-semibold justify-around my-8"
                    >
                      <div>{index}</div>
                      <div>Correct</div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SubmitCode;
