import useMousePosition from "../utils/useMousePosition";
import styles from "./home.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import hovercook from "../assets/hover-cookoff.svg";
import cookoff from "../assets/cookoff.svg";
import logo from "../assets/logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useWindowSize } from "@uidotdev/usehooks";
import RefreshToken from "@/utils/RefreshToken";
import Head from "next/head";

function App() {
  const router = useRouter();
  const [redirectTimer, setRedirectTimer] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setisClicked] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

  const handleClick = () => {
    setTimeout(() => {
      setisClicked(true);
    }, 300);
  };

  useEffect(() => {
    const refresh_token = localStorage.getItem("refresh_token");
    async function fetchData() {
      if (refresh_token) {
        await RefreshToken();
        router.push("/user");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isClicked) {
        router.push("/login");
      }
    }, 6000);

    setRedirectTimer(timer);

    return () => {
      clearTimeout(timer);
    };
  }, [isClicked]);

  const screen = useWindowSize();
  if (screen.width < 1024) {
    return (
      <div className="text-[#878787] flex justify-center text-6xl text-center h-full my-96">
        Please view on a laptop/pc
      </div>
    );
  } else {
    return (
      <div className={styles.master}>
        <Head>
          <title>CookOff 8.0</title>
          <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        </Head>
        {isClicked ? (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={styles.main}
          >
            <motion.div
              className={styles.mask}
              animate={{
                WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
                WebkitMaskSize: `${size}px`,
              }}
              transition={{ type: "tween", ease: "backOut", duration: 0.4 }}
            >
              <Image
                src={hovercook}
                alt="hoverCook"
                quality={100}
                onMouseEnter={() => {
                  setIsHovered(true);
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                }}
              />
            </motion.div>
            <div className={styles.body}>
              <Image src={cookoff} quality={100} alt="cookoff" />
            </div>
          </motion.main>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center items-center flex-col mt-36 mx-32"
          >
            <div className="flex w-[310px] mb-10">
              <Image src={logo} quality={100} alt="logo" />
            </div>
            <motion.button
              className="flex uppercase text-[#878787] text-2xl hover:text-[24px] px-[89px] py-[20px] border-[4px] border-[#878787] rounded-[50px] hover:bg-[#878787] hover:text-black"
              id="font_ITC"
              whileTap={{ scale: 0.9 }}
              animate={isClicked ? "is" : "isNot"}
              onTap={handleClick}
            >
              Start
            </motion.button>
          </motion.div>
        )}
        ;
      </div>
    );
  }
}

export default App;
