import { easeInOut, motion } from "framer-motion";
import { useFormik } from "formik";
import { useRouter } from "next/router";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Username Required";
  } else if (values.username.length > 15) {
    errors.username = "Must be 15 characters or less";
  }

  if (!values.password) {
    errors.password = "Password Required";
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/i.test(values.password)) {
    errors.password = "Invalid Password";
  }

  return errors;
};

function Login() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      const fullPath = `/${values.username}`;
      // alert(JSON.stringify(values, null, 2));
      router.push(fullPath);
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
          <form className="w-[400px]" onSubmit={formik.handleSubmit}>
            <div className="mb-[40px]">
              <input
                className="w-full py-[18px] px-[33px] text-[#D9D9D999] bg-[#1F1F1F] rounded-[25px] text-[22px] font-semibold"
                id="username"
                type="text"
                placeholder="Username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.errors.username ? <div className="text-[#D9D9D999] mt-1 ml-2">{formik.errors.username}</div> : null}
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
              {formik.errors.password ? <div className="text-[#D9D9D999] mt-1 ml-2">{formik.errors.password}</div> : null}
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
};
export default Login;
