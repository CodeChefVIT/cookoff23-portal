import Image from "next/image";
import cookoff from "../assets/cook-head.svg";
import menu from "../assets/menu-icon.svg";
import profile from "../assets/profile-icon.svg";
import Link from "next/link";
import { useState, useEffect } from "react";
import CountdownTimer from "./countdownTimer";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  const [isTestPortal, setIsTestPortal] = useState(false);
  useEffect(() => {
    setIsTestPortal(router.pathname.includes("testPortal"));
  }, [router.pathname]);
  return (
    <>
      <div className="flex justify-between items-center h-[115px]">
        {isTestPortal ? (
          <CountdownTimer />
        ) : (
          <div
            className="w-[100px] mx-9 bg-[#4d4d4d] rounded-xl text-center py-1 text-[#C1BBB3] font-semibold"
            id="font_proxima"
          >
            <p>00:00:00</p>
          </div>
        )}
        <div className="flex w-[450px] ml-[120px]">
          <Image src={cookoff} quality={100} alt="Cook-Off 8.0" />
        </div>
        <div className=" flex mx-5">
          <Link href="/login">
            <button className="text-[#C1BBB3] font-[700] px-[45px] py-[11px] mr-[30px] flex-shrink-0 border-none bg-[#1f1f1f] rounded-[25px]">
              Logout
            </button>
          </Link>

          <button>
            <Image src={profile} quality={100} alt="user" />
          </button>
        </div>
      </div>
    </>
  );
};
export default Navbar;
