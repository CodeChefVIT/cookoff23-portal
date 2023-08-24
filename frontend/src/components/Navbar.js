import Image from "next/image";
import cookoff from "../assets/cook-head.svg";
import menu from "../assets/menu-icon.svg";
import profile from "../assets/profile-icon.svg";
const Navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center h-[145px]">
        <div className="flex w-[60px] mx-5">
          <button>
            <Image src={menu} quality={100} />
          </button>
        </div>
        <div className="flex w-[550px] ml-[120px]">
          <Image src={cookoff} quality={100} />
        </div>
        <div className=" flex mx-5">
          <button className="text-[#C1BBB3] font-[700] px-[45px] py-[11px] mr-[30px] flex-shrink-0 border-none bg-[#1f1f1f] rounded-[25px]">
            Logout
          </button>

          <button>
            <Image src={profile} quality={100} />
          </button>
        </div>
      </div>
    </>
  );
};
export default Navbar;
