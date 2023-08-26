import Image from "next/image";
import correct from "../assets/correct.svg";
import wrong from "../assets/wrong.svg";
import redopenEye from "../assets/redopenEye.svg";
import redhiddenEye from "../assets/redhiddenEye.svg";
import greenopenEye from "../assets/greenopenEye.svg";
import greenhiddenEye from "../assets/greenhiddenEye.svg";
import lock from "../assets/lock.svg";
import { testcasesdata } from "../../Dummy_Data";

const TestCase = ({ clickedButton, runTestCases }) => {
  const totalTestCases = testcasesdata[clickedButton].testcases.length;

  const failedTestCases = testcasesdata[clickedButton].testcases.filter(
    (testcase) => testcase.status === "fail"
  ).length;

  const totalVisibleCases = testcasesdata[clickedButton].testcases.filter(
    (testcase) => testcase.hidden === false
  ).length;

  const totalHiddenCases = testcasesdata[clickedButton].testcases.filter(
    (testcase) => testcase.hidden === true
  ).length;

  return (
    <>
      {runTestCases && (
        <div id="font_proxima">
          <div className="flex justify-between items-center h-[100px] mx-5 my-4 bg-[#1f1f1f]">
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

            <div className="mx-6">
              <button className="text-white font-bold bg-[#1BA94C] rounded-[4px] px-[36px] py-[10px]">
                NEXT PROBLEM
              </button>
            </div>
          </div>
          <div className="flex h-[530px] bg-[#161616] mx-5">
            <div className="w-[30%] bg-[#1f1f1f]">
              <div>
                {testcasesdata[clickedButton].testcases.map(
                  (testcase, index) => (
                    <div key={index}>
                      {testcase.hidden ? (
                        testcase.status === "fail" ? (
                          <button className="flex items-center px-[35px] py-4 text-[20px] font-bold w-full">
                            <Image src={wrong} alt="wrong" quality={100} />
                            <div className="text-[#EB3939] mx-3">
                              Test Case {index}
                            </div>
                            <Image src={redhiddenEye} quality={100} />
                          </button>
                        ) : (
                          <button className="flex items-center px-[35px] py-4 text-[20px] font-bold w-full">
                            <Image src={correct} alt="wrong" quality={100} />
                            <div className="text-[#1BA94C] mx-3">
                              Test Case {index}
                            </div>
                            <Image src={greenhiddenEye} quality={100} />
                          </button>
                        )
                      ) : testcase.status === "fail" ? (
                        <button className="flex items-center px-[35px] py-4 text-[20px] font-bold w-full">
                          <Image src={wrong} alt="wrong" quality={100} />
                          <div className="text-[#EB3939] mx-3">
                            Test Case {index}
                          </div>
                          <Image src={redopenEye} quality={100} />
                        </button>
                      ) : (
                        <button className="flex items-center px-[35px] py-4 text-[20px] font-bold w-full">
                          <Image src={correct} alt="wrong" quality={100} />
                          <div className="text-[#1BA94C] mx-3">
                            Test Case {index}
                          </div>
                          <Image src={greenopenEye} quality={100} />
                        </button>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="w-[70%]">
              <div className="mx-10">
                <div className="mt-[20px] mb-[4px] font-bold text-lg text-[#C1BBB3]">
                  Compile Message
                </div>
                <div
                  id="cascadia"
                  className="bg-[#0d0d0d] text-white py-5 px-7"
                >
                  hello world
                </div>
              </div>
              <div className="flex justify-center mt-[150px]">
                <div className="">
                  <Image src={lock} quality={100} />
                </div>
                <div className="text-[#99948E] text-[28px] font-bold mx-5 ">
                  Hidden Test Case
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default TestCase;
