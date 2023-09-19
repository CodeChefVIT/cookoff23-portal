import { easeInOut, motion } from "framer-motion";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import cookoff from "../assets/cook-head.svg";
import useTokenStore from "@/store/tokenProvider";
import RefreshToken from "@/utils/RefreshToken";
import axios from "axios";

const validate = (values) => {
    const errors = {};
  
    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length < 3) {
      errors.name = "Name must be at least 3 characters long";
    }
  
    if (!values.registerNo) {
      errors.registerNo = "Register Number is required";
    } else if (!/^\d{2}[A-Za-z]{3}\d{4}$/.test(values.registerNo)) {
      errors.registerNo =
        "Enter valid Register number";
    }
  
    return errors;
  };
  
  
const register = () => {
  const [error, setError] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      registerNo: "",
      email: "",
    },
    validate,
    onSubmit: async (values) => {
      console.log(values);

      try {
        const response = await axios.post(
          "https://api-cookoff-prod.codechefvit.com/auth/login",
          values
        );

        if (response.status >= 200 && response.status < 300) {
          useTokenStore.setState({
            access_token: response.data.accessToken,
          });
          localStorage.setItem("access_token", response.data.accessToken);
          localStorage.setItem("refresh_token", response.data.refreshToken);

          await RefreshToken();
          setError(false);

          router.push("/login");
        }
      } catch (error) {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 401) {
            setError(true);
            localStorage.removeItem("access_token");
            useTokenStore.setState({
              access_token: "",
            });
            router.push("/login");
          } else if (statusCode === 403) {
            console.log("Access forbidden:", error);
          } else if (statusCode === 400) {
            console.log("Invalid credentials");
            setError(true);
          } else {
            console.log("An error occurred:", error);
          }
        } else {
          console.log("An unexpected error occurred:", error);
        }
      }
    },
  });
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: easeInOut, duration: 0.5 }}
        className="flex justify-center items-center h-screen"
      >
        <div className="flex flex-col">
          <div
            className={`flex w-[700px] ml-32 self-center ${
              !error ? "mb-12" : ""
            }`}
          >
            <Image src={cookoff} quality={100} alt="Cook-Off 8.0" />
          </div>
          {error && (
            <div className="text-[#D9D9D999] my-10 text-center">
              Invalid credentials
            </div>
          )}
          <form
            className="w-[400px] self-center"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-[40px]">
              <input
                className="w-full py-[18px] px-[33px] text-[#D9D9D999] bg-[#1F1F1F] rounded-[25px] text-[22px] font-semibold"
                id="name"
                type="text"
                placeholder="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name ? (
                <div className="text-[#D9D9D999] mt-1 ml-2">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
            <div className="mb-6">
              <input
                className="w-full py-[18px] px-[33px] text-[#D9D9D999] bg-[#1F1F1F] rounded-[25px] text-[22px] font-semibold"
                id="registerNo"
                type="text"
                placeholder="registerNo"
                onChange={formik.handleChange}
                value={formik.values.registerNo}
              />
              {formik.errors.registerNo ? (
                <div className="text-[#D9D9D999] mt-1 ml-2">
                  {formik.errors.registerNo}
                </div>
              ) : null}
            </div>
            <div className="mb-6">
              <input
                className="w-full py-[18px] px-[33px] text-[#D9D9D999] bg-[#1F1F1F] rounded-[25px] text-[22px] font-semibold"
                id="email"
                type="email"
                placeholder="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email ? (
                <div className="text-[#D9D9D999] mt-1 ml-2">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-center">
              <button
                className="uppercase text-[#D9D9D9] font-semibold py-[16px] px-[26px] text-[22px] border-[3px] border-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:text-black mt-5"
                type="submit"
              >
                Register to code!
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default register;
