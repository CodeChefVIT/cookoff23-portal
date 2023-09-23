import Question from "@/components/questions";
import { useState, useEffect } from "react";
import EditorWindow from "./EditorWindow";
import axios from "axios";
import { useRouter } from "next/router";
import RefreshToken from "@/utils/RefreshToken";

export default function Portal(props) {
  const router = useRouter();
  const [clickedButton, setClickedButton] = useState(0);
  const [qArr, setQArr] = useState([]);
  function handleClick(index) {
    setClickedButton(index);
  }
  // useEffect(() => {
  //   async function fetchData() {
  //     await RefreshToken();
  //   }

  //   fetchData();
  // }, []);
  useEffect(() => {
    const round = localStorage.getItem("round");
    async function fetchData() {
      try {
        await RefreshToken();
        const access_token = localStorage.getItem("access_token");
        axios
          .post(
            "https://api-cookoff-prod.codechefvit.com/ques/getRound",
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
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              router.push("/user");
            } else if (error.response && error.response.status === 400) {
              router.push("/user");
            } 
          });
      } catch {
        (error) => {
          console.log(error);
        };
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex h-[82vh]">
      <div className="flex flex-col">
        {qArr.map((question, index) => (
          <button
            key={index}
            id="font_ITC"
            onClick={() => handleClick(index)}
            className={`bg-[#0D0D0D] text-[#b7ab98] text-2xl 2xl:w-8 lg:w-6 hover:bg-[#161616] `}
            style={{
              background: clickedButton === index && "#161616",
              height: `${(1 / qArr.length) * 100}%`,
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {qArr.length > 0 && (
        <Question
          objective={qArr[clickedButton].name}
          points={qArr[clickedButton].points}
          task={qArr[clickedButton].objective}
          inputFormat={qArr[clickedButton].inputFormat}
          outputFormat={qArr[clickedButton].outputFormat}
          sampleInputs={qArr[clickedButton].sampleTestInput}
          sampleOutputs={qArr[clickedButton].sampleTestOutput}
          explanations={qArr[clickedButton].explanation}
          constraints={qArr[clickedButton].constraints}
        />
      )}
      {qArr.length > 0 && (
        <EditorWindow
          qArr={qArr}
          questionId={clickedButton}
          clickedButton={clickedButton}
          sampleInputs={qArr[clickedButton].sampleTestInput}
          sampleOutputs={qArr[clickedButton].sampleTestOutput}
        />
      )}
    </div>
  );
}
