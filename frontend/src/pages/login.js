import { easeInOut, motion } from "framer-motion";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import cookoff from "../assets/cook-head.svg";
import useTokenStore from "@/store/tokenProvider";
import RefreshToken from "@/utils/RefreshToken";
import axios from "axios";
import Head from "next/head";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email Required";
    // } else if (values.email.length > 15) {
    //   errors.email = "Must be 15 characters or less";
    // }
  }
  // if (!values.password) {
  //   errors.password = "Password Required";
  // }
  // } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/i.test(values.password)) {
  //   errors.password = "Invalid Password";
  // }

  return errors;
};

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        const response = await axios.post(
          process.env.API_KEY+"auth/login",
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

          router.push("/user");
        }
      } catch (error) {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 401) {
            setError("Invalid credentials");
            localStorage.removeItem("access_token");
            useTokenStore.setState({
              access_token: "",
            });
            router.push("/login");
          } else if (statusCode === 403) {
            // setError("User is banned");
            localStorage.removeItem("access_token");
            useTokenStore.setState({
              access_token: "",
            });
            alert("Skill Issue detected. Please contact organisers")
            router.push("/skissue");
          } else if (statusCode === 400) {
            setError("User not found");
            localStorage.removeItem("access_token");
            useTokenStore.setState({
              access_token: "",
            });
            router.push("/login");
          } else {
            setError("Something went wrong. Please try again.");
            localStorage.removeItem("access_token");
            useTokenStore.setState({
              access_token: "",
            });
            router.push("/login");
          }
        }
      }
      setIsLoading(false)
    },
  });

  return (
    <div>
      <Head>
        <title>CookOff | Login</title>
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
            <Image src={cookoff} quality={100} alt="Cook-Off 8.0" />
          </div>
          {error && (
            <div className="text-[#D9D9D999] my-10 text-center">
              {error}
            </div>
          )}
          <form
            className="w-[400px] self-center"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-[40px]">
              <input
                className="w-full py-[18px] px-[33px] text-[#D9D9D999] bg-[#1F1F1F] rounded-[25px] text-[22px] font-semibold"
                id="email"
                type="text"
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
            <div className="mb-6">
              <input
                className="w-full py-[18px] px-[33px] text-[#D9D9D999] bg-[#1F1F1F] rounded-[25px] text-[22px] font-semibold"
                id="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password ? (
                <div className="text-[#D9D9D999] mt-1 ml-2">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-center">
              <button
                className="uppercase text-[#D9D9D9] font-semibold py-[16px] px-[26px] text-[22px] border-[3px] border-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:text-black mt-5"
                type="submit"
                disabled={isLoading}
              >
                {isLoading?"Lighting a fire...":"Let's Get Cooking"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
export default Login;
