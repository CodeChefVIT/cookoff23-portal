import Image from "next/image";
import cookoff from "../assets/cook-head.svg";
import profile from "../assets/profile-icon.svg";
import { useState, useEffect } from "react";
import CountdownTimer from "./countdownTimer";
import { useRouter } from "next/router";
import useTokenStore from "@/store/tokenProvider";
import axios from "axios";
import RefreshToken from "@/utils/RefreshToken";


const Navbar = () => {
  const router = useRouter();

  const [isTestPortal, setIsTestPortal] = useState(false);
  useEffect(() => {
    setIsTestPortal(router.pathname.includes("testPortal"));
  }, [router.pathname]);

  async function handleLogout() {
    await RefreshToken();
    const access_token = localStorage.getItem("access_token");
    try {
      axios
        .post(
          "http://localhost:8080/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          useTokenStore.setState({ access_token: "" });
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        })
        .then(() => {
          router.push("/login");
        });
    } catch {
      (error) => {
        console.log("Logout failed: " + error);
      };
    }
  }
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
          <button
            className="text-[#C1BBB3] font-[700] px-[45px] py-[11px] mr-[30px] flex-shrink-0 border-none bg-[#1f1f1f] rounded-[25px]"
            onClick={handleLogout}
          >
            Logout
          </button>

          <button>
            <Image src={profile} quality={100} alt="user" />
          </button>
        </div>
      </div>
    </>
  );
};
export default Navbar;
