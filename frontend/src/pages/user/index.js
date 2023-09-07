import Navbar from "@/components/Navbar";
import RoundWise from "@/components/roundWise";
import CurrentProfile from "@/components/CurrentProfile";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function Dashboard() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [qArr, setQArr] = useState([]);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    try {
      axios
        .get("http://localhost:8080/auth/dashboard", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          setName(response.data.name);
          setRound(response.data.roundQualified + 1);
          setScore(response.data.score);
          localStorage.setItem("round", response.data.roundQualified + 1);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            localStorage.removeItem("access_token");
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

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    try {
      axios
        .post(
          "http://localhost:8080/ques/getRound",
          { round: round },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          const responseData = response.data;
          if (responseData && responseData.length > 0) {
            setQArr(responseData);
          } else {
            console.log("No data received from the API.");
          }
        });
    } catch {
      (error) => {
        console.log(error);
      };
    }
  }, []);

  return (
    <>
      <main>
        <Navbar />
        <div className="flex">
          <CurrentProfile name={name} round={round} />
          <RoundWise round={round} score={score} qArr={qArr} />
        </div>
      </main>
    </>
  );
}

export default Dashboard;
