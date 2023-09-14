import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import lock from "../assets/lock.svg";

function SubmitCode(props) {
  const { clickedButton, submissionArray } = props;
  const containerRef = useRef(null);
  const [testCaseClicked, setTestCaseClicked] = useState(0);

  useEffect(() => {
    setTestCaseClicked(0);
    containerRef.current.scrollIntoView();
  }, [clickedButton]);
  return (
    <>
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
            {submissionArray.error[0] && (
              <div>
                <div className="flex text-xl text-[#EB3939] font-semibold justify-around my-7 ml-9">
                  <div>0</div>
                  <div className="flex-col ml-10">
                    <div className="text-center">Not Accepted</div>
                    <div className="text-xs text-center">
                      Compilation/RunTime Error
                    </div>
                  </div>
                </div>
                <div className="flex text-xl text-[#c1bbb3] font-semibold justify-around my-7">
                  <div>1</div>
                  <div>Ignored</div>
                </div>
                <div className="flex text-xl text-[#c1bbb3] font-semibold justify-around my-7">
                  <div>2</div>
                  <div>Ignored</div>
                </div>
              </div>
            )}
            {submissionArray.error[1] && (
              <div>
                <div className="flex text-xl text-[#1ba94c] font-semibold justify-around my-7">
                  <div>0</div>
                  <div>Correct</div>
                </div>
                <div className="flex text-xl text-[#EB3939] font-semibold justify-around my-7 ml-8">
                  <div>1</div>
                  <div className="flex-col ml-10">
                    <div>Not Accepted</div>
                    <div className="text-xs text-center">
                      Time Limit Exceeded
                    </div>
                  </div>
                </div>
                <div className="flex text-xl text-[#c1bbb3] font-semibold justify-around my-7">
                  <div>2</div>
                  <div>Ignored</div>
                </div>
              </div>
            )}
            {submissionArray.error[2] && (
              <div>
                <div className="flex text-xl text-[#1ba94c] font-semibold justify-around my-7">
                  <div>0</div>
                  <div>Correct</div>
                </div>
                <div className="flex text-xl text-[#1ba94c] font-semibold justify-around my-7">
                  <div>1</div>
                  <div>Correct</div>
                </div>
                <div className="flex text-xl text-[#EB3939] font-semibold justify-around my-7 ml-8">
                  <div>2</div>
                  <div className="flex-col ml-10">
                    <div>Not Accepted</div>
                    <div className="text-xs text-center">Wrong Output</div>
                  </div>
                </div>
              </div>
            )}
            {!submissionArray.error[0] &&
              !submissionArray.error[1] &&
              !submissionArray.error[2] && (
                <div>
                  <div className="flex text-xl text-[#1ba94c] font-semibold justify-around my-7">
                    <div>0</div>
                    <div>Correct</div>
                  </div>
                  <div className="flex text-xl text-[#1ba94c] font-semibold justify-around my-7">
                    <div>1</div>
                    <div>Correct</div>
                  </div>
                  <div className="flex text-xl text-[#1ba94c] font-semibold justify-around my-7">
                    <div>2</div>
                    <div>Correct</div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SubmitCode;
