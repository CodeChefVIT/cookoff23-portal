import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";

function Dashboard() {
  const router = useRouter();
  function startTest() {
    const user = router.query.user;
    const fullPath = `/${user}/testPortal`;
    router.push(fullPath);
  }
  return (
    <>
      <main>
        <Navbar />
        <div className="flex items-center justify-center">
          <button
            className="uppercase text-[#D9D9D9] font-semibold py-[16px] px-[26px] text-[22px] border-[3px] border-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:text-black mt-5"
            onClick={startTest}
          >
            Start Test
          </button>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
