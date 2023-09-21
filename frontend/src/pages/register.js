import { easeInOut, motion } from "framer-motion";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import cookoff from "../assets/cook-head.svg";
import axios from "axios";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  } else if (values.name.length < 3) {
    errors.name = "Name must be at least 3 characters long";
  }

  if (!values.regNo) {
    errors.regNo = "Register Number is required";
  } else if (!/^\d{2}[A-Za-z]{3}\d{4}$/.test(values.regNo)) {
    errors.regNo = "Enter a valid Register number";
  }

  if (!values.email) {
    errors.email = "Email Required";
  }

  return errors;
};

function Register () {
  const [error, setError] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      regNo: "",
      email: "",
      password: "1234"
    },
    validate,
    onSubmit: async (values) => {
      console.log(values);

      try {
        const response = await axios.post(
          `https://api-cookoff-prod.codechefvit.com/auth/signup`,
          values
        );
        console.log("API response:", response);

        if (response.status >= 200 && response.status < 300) {
          setError(false);
          router.push("/login");
        }
      } catch (error) {
        if (error.response) {
          console.error("API error:", error);
          const statusCode = error.response.status;
          console.log(`status code: ${statusCode}`);
          if (statusCode === 400) {
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
              Registration failed. Please check your information
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
                id="regNo"
                type="text"
                placeholder="regNo"
                onChange={formik.handleChange}
                value={formik.values.regNo}
              />
              {formik.errors.regNo ? (
                <div className="text-[#D9D9D999] mt-1 ml-2">
                  {formik.errors.regNo}
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

export default Register;
