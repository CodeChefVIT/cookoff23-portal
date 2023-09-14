import Image from "next/image";
import correct from "../assets/correct.svg";
import wrong from "../assets/wrong.svg";
import redopenEye from "../assets/redopenEye.svg";
import redhiddenEye from "../assets/redhiddenEye.svg";
import greenopenEye from "../assets/greenopenEye.svg";
import greenhiddenEye from "../assets/greenhiddenEye.svg";
import lock from "../assets/lock.svg";
import { testcasesdata } from "../../Dummy_Data";
import { useState, useEffect, useRef } from "react";
import { customTestCaseData } from "../../Dummy_Data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";

const TestCase = ({ clickedButton, runData, code, program }) => {
  const containerRef = useRef(null);
  const customTestCaseRef = useRef(null);
  const [customInput, setCustomInput] = useState("");
  const [testCaseIndex, setTestCaseIndex] = useState(0);
  const [testCaseClicked, setTestCaseClicked] = useState(0);
  const [customTestCase, setCustomTestCase] = useState(null);
  const [customOutput, setCustomOutput] = useState();
  const [runToken, setRunToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);

  const totalTestCases = runData.length;

  const failedTestCases = runData.filter(
    (testcase) => testcase.status_id === 4
  ).length;

  // const totalVisibleCases = testcasesdata[clickedButton].testcases.filter(
  //   (testcase) => testcase.hidden === false
  // ).length;

  // const totalHiddenCases = runData.filter(
  //   (testcase) => testcase.hidden === true
  // ).length;

  useEffect(() => {
    setTestCaseClicked(0);
    setTestCaseIndex(0);
    setCustomTestCase(null);
    containerRef.current.scrollIntoView();
  }, [clickedButton]);

  useEffect(() => {
    function fetchSubmit() {
      try {
        console.log(runToken);
        axios
          .get(
            "http://139.59.4.43:2358/submissions/" +
              runToken +
              "?base64_encoded=false&fields=stdout,stderr,status_id,language_id"
          )
          .then((response) => {
            console.log(response.data);
            if (
              response.data.status_id === 1 ||
              response.data.status_id === 2
            ) {
              setLoading(true);
              setTimeout(() => {
                fetchSubmit();
              }, 3000);
            } else {
              setLoading(false);
              setCustomOutput(response.data.stdout);
            }
          });
      } catch {
        (error) => {
          console.log(error);
        };
      }
    }
    if (runToken) {
      fetchSubmit();
    }
  }, [runToken]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(customInput);
    // const cIn = customInput.replace(/\n/g, "\\n");
    // console.log(cIn);
    try {
      axios
        .post(
          "http://139.59.4.43:2358/submissions/?base64_encoded=false",

          {
            language_id: code,
            source_code: program,
            stdin: customInput,
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            setRunToken(response.data.token);
            setInvalidInput(false);
          }
        }).catch((error) => {
          if (error.response && error.response.status === 422) {
            console.log("Invalid Input")
            setInvalidInput(true);
            console.log(invalidInput);
          }
        });
    } catch (error){
      if (error.response && error.response.status === 422) {
        console.log("Invalid Input")
      }
    }
    setLoading(true);
    setCustomOutput(1);
  }

  return (
    <>
      <div id="font_proxima" className="mb-5" ref={containerRef}>
        <div className="flex justify-between items-center min-h-[100px] mx-5 mb-4 bg-[#1f1f1f]">
          {failedTestCases / totalTestCases === 0 ? (
            <div className="text-[28px] text-[#1BA94C] font-extrabold mx-6">
              All Test Cases Passed !
            </div>
          ) : (
            <div className="mx-6">
              <div className="text-[28px] text-[#EB5939] font-extrabold">
                {failedTestCases}/{totalTestCases} Testcases Have Failed !!
              </div>
              <div className="text-[14px] text-[#B7AB98]">Try Again!!!</div>
            </div>
          )}

          {/* <div className="mx-6">
            <button className="text-white font-bold bg-[#1BA94C] rounded-[4px] px-[36px] py-[10px]">
              NEXT PROBLEM
            </button>
          </div> */}
        </div>
        <div className="flex h-fit bg-[#161616] mx-5 pb-5">
          <div className="w-[30%] bg-[#1f1f1f]">
            <div>
              {runData.map((testcase, index) => (
                <div key={index}>
                  {testcase.status_id === 4 ? (
                    <button
                      className="flex items-center px-[30px] py-4 text-[20px] font-bold w-full hover:bg-[#161616]"
                      onClick={() => {
                        setTestCaseIndex(index);
                        setTestCaseClicked(index);
                        setCustomTestCase(null);
                      }}
                      style={{
                        background: testCaseClicked === index && "#161616",
                      }}
                    >
                      <Image src={wrong} alt="wrong" quality={100} />
                      <div className="text-[#EB3939] mx-3">
                        Test Case {index}
                      </div>
                      <Image
                        src={redopenEye}
                        quality={100}
                        alt="testcasefailed"
                      />
                    </button>
                  ) : (
                    <button
                      className="flex items-center px-[30px] py-4 text-[20px] font-bold w-full hover:bg-[#161616]"
                      onClick={() => {
                        setTestCaseIndex(index);
                        setTestCaseClicked(index);
                        setCustomTestCase(null);
                      }}
                      style={{
                        background: testCaseClicked === index && "#161616",
                      }}
                    >
                      <Image src={correct} alt="wrong" quality={100} />
                      <div className="text-[#1BA94C] mx-3">
                        Test Case {index}
                      </div>
                      <Image
                        src={greenopenEye}
                        quality={100}
                        alt="testcasepassed"
                      />
                    </button>
                  )}
                </div>
              ))}
              <button
                className="flex items-center px-[30px] py-4 text-[20px] font-bold w-full hover:bg-[#161616]"
                onClick={() => {
                  setCustomTestCase(clickedButton);
                  setTestCaseClicked(null);
                }}
                style={{
                  background: customTestCase === clickedButton && "#161616",
                }}
                // style={{
                //   background: testCaseClicked === index && "#161616",
                // }}
              >
                <div className="text-[#C1BBB3] mx-1">Custom Test Case</div>
              </button>
            </div>
          </div>
          {(testcasesdata[clickedButton].testcases[testCaseIndex]
            ?.compileMessage === undefined) ? (
            <div>Loadinng...</div>
          ) : testCaseClicked === null && customTestCase === clickedButton ? (
            <div className="w-[70%] overflow-auto">
              <div className="mx-10">
                <div className="mt-[20px] mb-4 font-bold text-lg text-[#C1BBB3]">
                  Enter Custom Test Case
                </div>
                <textarea
                  placeholder="Type Custom Input Here..."
                  id="cascadia"
                  className="text-white w-full py-2 px-5 ml-1 bg-[#2C2C2C] placeholder:opacity-50 placeholder-[#878787] resize-none mb-2"
                  htmlFor="input"
                  onChange={(e) => setCustomInput(e.target.value)}
                  value={customInput}
                ></textarea>
                <button
                  className="text-white font-bold bg-[#1BA94C] rounded-[4px] px-5 py-[6px] mt-2"
                  onClick={handleSubmit}
                >
                  Run
                </button>
                { customOutput && 
                  (loading ? (
                    <div className="text-white text-center mt-10">loading...</div>
                  ) : (
                    <div className="mb-10">
                      <div className="">
                        <div className="mt-[20px] mb-[4px] font-bold text-lg text-[#1BA94C]">
                          Output
                        </div>
                        <div
                          id="cascadia"
                          className="bg-[#0d0d0d] text-white py-5 px-7"
                        >
                          {customOutput}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="w-[70%]">
              <div className="mx-10">
                <div className="mt-[20px] mb-[4px] font-bold text-lg text-[#C1BBB3]">
                  Input
                </div>
                <div
                  id="cascadia"
                  className="bg-[#0d0d0d] text-white py-5 px-7 whitespace-pre"
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {runData[testCaseIndex].stdin}
                  </ReactMarkdown>
                </div>
              </div>
              {
                <div>
                  <div className="mx-10">
                    <div className="mt-[20px] mb-[4px] font-bold text-lg text-[#C1BBB3]">
                      Expected Output
                    </div>
                    <div
                      id="cascadia"
                      className="bg-[#0d0d0d] text-white py-5 px-7 whitespace-pre"
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {runData[testCaseIndex].expected_output}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div className="mx-10">
                    <div className="mt-[20px] mb-[4px] font-bold text-lg text-[#C1BBB3]">
                      Output
                    </div>
                    <div
                      id="cascadia"
                      className="bg-[#0d0d0d] text-white py-5 px-7 whitespace-pre"
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {runData[testCaseIndex].stdout}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              }
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default TestCase;
