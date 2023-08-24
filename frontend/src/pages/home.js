import useMousePosition from "../utils/useMousePosition";
import styles from "./home.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import hovercook from "../assets/hover-cookoff.svg";
import cookoff from "../assets/cookoff.svg";
import logo from "../assets/logo.svg";
import Image from "next/image";

function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setisClicked] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

  const handleClick = () => {
    setTimeout(() => {
      setisClicked(true);
    }, 300);
  };

  const variants = {
    is: { opacity: 0, y: "-100%" },
    isNot: { opacity: 1, y: 0 },
  };

  return (
    <div className={styles.master}>
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
            <Image src={cookoff} quality={100} />
          </div>
        </motion.main>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center flex-col mt-36 mx-32"
        >
          <div className="flex w-[310px] mb-10">
            <Image src={logo} quality={100} />
          </div>
          <motion.button
            className="flex uppercase text-[#878787] text-2xl hover:text-[24px] px-[89px] py-[20px] border-[4px] border-[#878787] rounded-[50px] hover:bg-[#878787] hover:text-black"
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

export default App;