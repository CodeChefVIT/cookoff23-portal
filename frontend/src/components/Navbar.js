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
      const response = await axios.post(
        "https://api-cookoff-prod.codechefvit.com/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      useTokenStore.setState({ access_token: "" });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("timerTime");
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      await router.push("/login");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            );
        });
        router.push("/login");
      }
    }
  }

  async function handleEndTest() {
    const userConfirmed = window.confirm(
      "Please submit all questions. If not submitted the code will not be saved. Are you sure you want to end the test"
    );

    if (userConfirmed) {
      try {
        await RefreshToken();
        const access_token = localStorage.getItem("access_token");
        const response = await axios.get(
          "https://api-cookoff-prod.codechefvit.com/submit/endtest",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (response.status >= 200 && response.status < 300) {
          const updateTimer = (newTime) => {
            localStorage.setItem("timerTime", newTime.toString());
          };
          updateTimer(2 * 60 * 45);

          await router.push("/user/FinalTaskCheck");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          localStorage.removeItem("access_token");
          useTokenStore.setState({
            access_token: "",
          });
          router.push("/login");
        }
      }
    }
  }

  return (
    <>
      <div>
        {isTestPortal ? (
          <div className="flex justify-between items-center h-[115px]">
            <CountdownTimer />
            <div className="flex w-[450px] ml-[120px]">
              <Image src={cookoff} quality={100} alt="Cook-Off 8.0" />
            </div>
            <div className=" flex mx-5">
              <button
                href=""
                className="text-[#C1BBB3] font-[700] px-[45px] py-[11px] mr-[30px] flex-shrink-0 border-none bg-[#1f1f1f] rounded-[25px]"
                onClick={handleEndTest}
              >
                End Test
              </button>

              <button>
                <Image src={profile} quality={100} alt="user" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center h-[115px]">
            <div className="mr-24"></div>
            <div className="flex w-[450px] ml-[120px]">
              <Image src={cookoff} quality={100} alt="Cook-Off 8.0" />
            </div>
            <div className="flex mx-5">
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
        )}
      </div>
    </>
  );
};
export default Navbar;
