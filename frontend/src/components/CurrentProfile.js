import Image from "next/image";
import Profile from "../assets/CurrentProfile.svg";

const CurrentProfile = () => {
  return (
    <div className="mt-14 ml-10">
      <div className="h-[80vh] w-[23vw] bg-red-300">
        <div className="h-9 flex justify-center items-center bg-slate-600">
          <h2>Current Profile</h2>
        </div>
        <div className="h-[150px] flex justify-center items-center">
          <Image src={Profile} width={100} alt="profileimg"></Image>
        </div>
        <div className="h-[10px] flex justify-center items-center">
          <button>Add image</button>
        </div>
        <form className="mt-5 w-[15vw]">
          <div className="mb-6">
            <input
              className="w-full py-[12px] px-[33px] text-[#D9D9D999] bg-[#1F1F1F] rounded-[25px] text-[22px] font-semibold"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full py-[12px] px-[33px] text-[#D9D9D999] bg-[#1F1F1F] rounded-[25px] text-[22px] font-semibold"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CurrentProfile;
