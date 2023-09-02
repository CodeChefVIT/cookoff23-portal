import Navbar from "@/components/Navbar";
import Image from "next/image";
import tickIcon from "../../assets/TickIcon.svg";
import { useRouter } from "next/router";

const TestComplete = () => {
  const router = useRouter();
  
  function returnToDashboard() {
    const user = router.query.user;
    const fullPath = `/user`;
    router.push(fullPath);
  }
  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-24">
        <div
          className="flex justify-center h-40 w-40 bg-[#434343] rounded-full ring-2 ring-[#B7AB98] ring-offset-8
         ring-offset-[#0D0D0D]"
        >
          <Image src={tickIcon} width={85} alt="" />
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <div className="text-[#B7AB98] text-2xl font-semibold">
          <p>You have completed the test. Stay tuned for the Results!</p>
        </div>
      </div>
      <div className="flex justify-center mt-16">
        <div className="">
          <button
            className="text-[#D9D9D9] text-lg hover:text-[20px] ease-in-out duration-100 font-semibold  ring-2 ring-[#D9D9D9] py-0.5 px-5 rounded-full ring-offset-8 hover:ring-offset-[10px]
         ring-offset-[#0D0D0D]"
            onClick={returnToDashboard}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </>
  );
};

export default TestComplete;
