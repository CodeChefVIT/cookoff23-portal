import Image from "next/image";
import { RxUpload } from "react-icons/rx";
import Profile from "../assets/CurrentProfile.svg";

function CurrentProfile(props) {
  const { name, round } = props;
  return (
    <div className="mt-2 ml-10">
      <div className="h-[61vh] w-[27vw] bg-[#161616] overflow-auto">
        <div className="h-9 flex justify-center items-center bg-[#242424] text-[#EB5939] text-lg font-bold">
          <h2>Current Profile</h2>
        </div>
        <div className="h-[150px] flex justify-center items-center">
          <Image src={Profile} width={110} alt="profileimg"></Image>
        </div>
        {/* <div className="h-[10px] pt-4 pb-2 flex justify-center items-center">
          <button className="h-[35px] flex justify-center items-center w-[160px] text-[#D9D9D999] bg-[#1F1F1F] rounded-full">
            <RxUpload className="text-xl " />
            <span className="pl-2">Add image</span>
          </button>
        </div> */}

        <div className="mt-7 flex flex-col items-center">
          <div className="mb-6 ">
            <div className="w-[20vw] py-[11px] px-[33px] text-[#D9D9D999] bg-[#1F1F1F] rounded-[25px] text-[22px] font-semibold text-center">
              {name}
            </div>
          </div>

          <div className="mb-6">
            <div className="w-[20vw] py-[11px] px-[33px] text-[#D9D9D999] bg-[#1F1F1F] rounded-[25px] text-[22px] font-semibold text-center">
              Round {round}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentProfile;
