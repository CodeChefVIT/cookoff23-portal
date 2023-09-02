import Navbar from "@/components/Navbar";
import RoundWise from "@/components/roundWise";
import CurrentProfile from "@/components/CurrentProfile";
import { useEffect } from "react";
import useTokenStore from "@/store/tokenProvider";
import { useRouter } from "next/router";
import axios from "axios";

function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    try {
      console.log(access_token);
      axios
        .get("https://api-cookoff-prod.codechefvit.com/auth/dashboard", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            router.push("/login");
          } else {
            console.log(error);
          }
        });
    } catch {
      (error) => {
        console.log(error);
      };
    }
  });

  return (
    <>
      <main>
        <Navbar />
        <div className="flex">
          <CurrentProfile />
          <RoundWise />
        </div>
      </main>
    </>
  );
}

export default Dashboard;
