import { easeInOut, motion } from "framer-motion";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import cookoff from "../assets/cook-head.svg";
import axios from "axios";
import Head from "next/head";

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

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      regNo: "",
      email: "",
    },
    validate,
    onSubmit: async (values) => {
      console.log(values)
      setIsLoading(true);
      try {
        const response = await axios.post(
          `https://api-cookoff-prod.codechefvit.com/auth/create`,
          values
        );

        if (response.status >= 200 && response.status < 300) {
          setError(false);
          alert("Password has been sent to the entered email.")
          router.push("/login");
        }
      } catch (error) {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode >= 400) {
            setError(error.response.data.error);
          }
        }
      }
      setIsLoading(false);
    },
  });

  return (
    <div>
      <Head>
        <title>CookOff | Register</title>
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
            <Image src={cookoff} quality={100} alt="Cook-Off 8.0" className="ml-28 mt-32 md:ml-0 sm:ml-12 md:mt-0"/>
          </div>
          {error && (
            <div className="text-[#D9D9D999] my-10 text-center">{error}</div>
          )}
          <form
            className="w-[400px] self-center ml-48 sm:ml-16 md:ml-0"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-6">
              <input
                className="w-full py-[18px] px-[33px] text-[#D9D9D999] bg-[#1F1F1F] rounded-[25px] text-[22px] font-semibold"
                id="name"
                type="text"
                placeholder="Name"
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
                placeholder="Registration Number"
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
                placeholder="Email"
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
                disabled={isLoading}
              >
                {isLoading?"Registering...":"Register as a chef"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
