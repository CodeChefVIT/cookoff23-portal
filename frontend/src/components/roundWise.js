import questionData from "../../Dummy_Data";
import eye from "./../assets/normaleye.svg";
import Image from "next/image";
import { useRouter } from "next/router";

function RoundWise() {
  const router = useRouter();
  function startTest() {
    const user = router.query.user;
    const fullPath = `/user/testPortal`;
    router.push(fullPath);
  }
  return (
    <div className="w-[65%] ml-10 h-[83vh] overflow-auto">
      {questionData.map(
        (question, index) =>
          question.active && (
            <div key={index} className="mt-2">
              <div>
                <div className="bg-[#242424] flex justify-between text-lg">
                  <div className="text-[#B7AB98] flex gap-2">
                    <h1 id="font_proxima" className="ml-2">
                      ROUND {index + 1}
                    </h1>
                    <Image src={eye} quality={100} width={15} alt="SeeRound" />
                  </div>
                  <div className="text-[#B7AB98]">
                    <button id="font_proxima" className="mr-2">
                      View Submissions &gt;
                    </button>
                  </div>
                </div>
                <div className="bg-[#161616] leading-relaxed flex justify-between">
                  <div className="flex flex-col self-center mx-auto my-2">
                    <div
                      className="rounded-full border-[#C1BBB3] border-2 text-[#C1BBB3] text-center py-4 text-lg"
                      id="font_proxima"
                    >
                      <p>0/{question.qdata.length}</p>
                      <p>Solved</p>
                    </div>
                    <div
                      className="bg-[#4d4d4d] mt-2 rounded-md text-center text-[#C1BBB3] px-1"
                      id="font_proxima"
                    >
                      Score:&nbsp;
                      0
                      /
                      {question.qdata.reduce(
                        (sum, question) => sum + parseFloat(question.points),
                        0
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    {question.qdata.map((question2, index2) => (
                      <div
                        className="bg-[#363434] flex w-[550px] justify-between h-[35px] items-center mb-4 rounded-lg mr-2 text-md font-light"
                        id="font_ITC"
                        key={index2}
                      >
                        <div className="text-[#d9d9d9] ml-2">
                          {index2 + 1}. {question2.objective}
                        </div>
                        <div className="bg-[#EDEDED] text-black mr-2 rounded-md px-1">
                          {question2.points}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
      )}
      <div className="flex items-center justify-center mt-16">
        <button
          className="uppercase text-[#D9D9D9] font-semibold py-[16px] px-[26px] text-[22px] border-[3px] border-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:text-black"
          onClick={startTest}
        >
          Start Test
        </button>
      </div>
    </div>
  );
}

export default RoundWise;
