import { easeInOut, motion } from "framer-motion";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useTokenStore from "@/store/tokenProvider";
import axios from "axios";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email Required";
    // } else if (values.email.length > 15) {
    //   errors.email = "Must be 15 characters or less";
    // }
  }
  if (!values.password) {
    errors.password = "Password Required";
  }
  // } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/i.test(values.password)) {
  //   errors.password = "Invalid Password";
  // }

  return errors;
};

function Login() {
  const [error, setError] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      try {
        axios
          .post("http://localhost:8080/auth/login", values)
          .then((response) => {
            // useTokenStore.setState({
            //   access_token: response.data.accessToken,
            // });
            // localStorage.setItem("access_token", response.data.accessToken);
            // localStorage.setItem("refresh_token", response.data.refreshToken);
            if (response.status === 200) {
              // Login was successful
              console.log(response.data.accessToken);
              useTokenStore.setState({
                access_token: response.data.accessToken,
              });
              localStorage.setItem("access_token", response.data.accessToken);
              localStorage.setItem("refresh_token", response.data.refreshToken);
            }
          })
          .then(() => {
            router.push("/user");
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              localStorage.removeItem("access_token");
              useTokenStore.setState({
                access_token: "",
              });
              router.push("/login");
            } else {
              console.log(error);
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              setError(true);
              console.log("Invalid credentials");
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              setError(true);
              console.log("Invalid credentials");
            }
          });
        // .then(() => {
        //   console.log("login successful");
        //   router.push("/user");
        // });
      } catch {
        (error) => {
          console.log("Login failed: " + error);
        };
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
        <div>
          {error && (
            <div className="text-[#D9D9D999] mb-10 text-center">
              Invalid credentials
            </div>
          )}
          <form className="w-[400px]" onSubmit={formik.handleSubmit}>
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
              >
                Let&apos;s Get Cooking
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
export default Login;
