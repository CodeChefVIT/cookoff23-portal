import Navbar from "@/components/Navbar";
import RoundWise from "@/components/roundWise";
import CurrentProfile from "@/components/CurrentProfile";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTokenStore from "@/store/tokenProvider";
import axios from "axios";
import RefreshToken from "@/utils/RefreshToken";
import Head from "next/head";

function Dashboard() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [qArr, setQArr] = useState([]);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [roundActive, setRoundActive] = useState(true);
  useEffect(() => {
    async function fetchDataDash() {
      const access_token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          "https://api-cookoff-prod.codechefvit.com/auth/dashboard",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        setName(response.data.name);
        setRound(response.data.roundQualified + 1);
        setScore(response.data.score);
        setRoundActive(response.data.isRoundActive);
        localStorage.setItem("round", response.data.roundQualified + 1);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          useTokenStore.setState({
            access_token: "",
          });
          router.push("/login");
        } 
      }
    }
    async function fetchDataRound() {
      const access_token = localStorage.getItem("access_token");
      try {
        const response = await axios.post(
          "https://api-cookoff-prod.codechefvit.com/ques/getRound",
          { round: round },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        const responseData = response.data;
        if (responseData && responseData.length > 0) {
          setQArr(responseData);
        } else {
          console.log("No data received from the API.");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("No questions");
        } else if (error.response && error.response.status === 403) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          useTokenStore.setState({
            access_token: "",
          });
          router.push("/login");
        }
      }
    }
    async function action() {
      await RefreshToken();
      await fetchDataDash();
      await fetchDataRound();
    }
    action();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
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
      <main>
        <Navbar />
        <div className="flex">
          <CurrentProfile name={name} round={round} />
          <RoundWise
            round={round}
            score={score}
            qArr={qArr}
            roundActive={roundActive}
          />
        </div>
      </main>
    </>
  );
}

export default Dashboard;
