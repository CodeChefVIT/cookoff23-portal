import eye from "./../assets/normaleye.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import RefreshToken from "@/utils/RefreshToken";

function RoundWise(props) {
  const { round, score, qArr, roundActive } = props;
  const router = useRouter();
  async function startTest() {
    await RefreshToken();
    const fullPath = `/user/testPortal`;
    router.push(fullPath);
  }

  return (
    <div className="w-[65%] ml-10 h-[83vh] overflow-auto">
      <div className="mt-2">
        <div>
          <div className="bg-[#242424] flex justify-between text-lg">
            <div className="text-[#B7AB98] flex gap-2">
              <h1 id="font_proxima" className="ml-2">
                ROUND {round}
              </h1>
            </div>
          </div>
          <div className="bg-[#161616] leading-relaxed flex justify-between">
            <div className="mt-4 ml-2">
              {qArr.map((question2, index2) => (
                <div
                  className="bg-[#363434] flex w-[550px] justify-between h-[35px] items-center mb-4 rounded-lg mr-2 text-md font-light"
                  id="font_ITC"
                  key={index2}
                >
                  <div className="text-[#d9d9d9] ml-2">
                    {index2 + 1}. {question2.name}
                  </div>
                  <div className="bg-[#EDEDED] text-black mr-2 rounded-md px-1">
                    {question2.points + " points"}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col self-center mx-auto my-2">
              <div
                className="bg-[#4d4d4d] mt-2 rounded-md text-center text-[#C1BBB3] px-2 py-2"
                id="font_proxima"
              >
                Round Score:&nbsp;
                {score}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-16">
        {roundActive && (
          <button
            className="uppercase text-[#D9D9D9] font-semibold py-[16px] px-[26px] text-[22px] border-[3px] border-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:text-black"
            onClick={startTest}
          >
            Start Test
          </button>
        )}
      </div>
    </div>
  );
}

export default RoundWise;
