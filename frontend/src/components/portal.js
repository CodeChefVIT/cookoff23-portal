import Question from "@/components/questions";
import { useState, useEffect } from "react";
import questionData, { compilationError } from "../../Dummy_Data";
import EditorWindow from "./EditorWindow";
import axios from "axios";
import RefreshToken from "@/utils/RefreshToken";

export default function Portal(props) {
  const length = questionData.length;
  const [clickedButton, setClickedButton] = useState(0);
  const [qArr, setQArr] = useState([]);
  function handleClick(index) {
    setClickedButton(index);
  }
  useEffect(() => {
    async function fetchData() {
      await RefreshToken();
    }

    fetchData();
  }, []);
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    const round = localStorage.getItem("round");
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
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            console.log("400");
          }
        });
    } catch {
      (error) => {
        console.log(error);
      };
    }
  }, []);

  useEffect(() => {
    console.log("qArr:", qArr);
  }, [qArr]);

  return (
    <div className="flex h-[82vh]">
      <div className="flex flex-col">
        {questionData.map((question, index) => (
          <button
            key={index}
            id="font_ITC"
            onClick={() => handleClick(index)}
            className={`bg-[#0D0D0D] text-[#b7ab98] text-2xl 2xl:w-8 lg:w-6 hover:bg-[#161616] `}
            style={{
              background: clickedButton === index && "#161616",
              height: `${(1 / length) * 100}%`,
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
          sampleInput1={qArr[clickedButton].testCases[0].input}
          sampleOutput1={qArr[clickedButton].testCases[0].expectedOutput}
          explanation1={qArr[clickedButton].testCases[0].explanation}
          sampleInput2={qArr[clickedButton].testCases[1].input}
          sampleOutput2={qArr[clickedButton].testCases[1].expectedOutput}
          explanation2={qArr[clickedButton].testCases[1].explanation}
          constraints={qArr[clickedButton].constraints}
        />
      )}
      {qArr.length > 0 && (
        <EditorWindow
          qArr={qArr}
          questionId={clickedButton}
          clickedButton={clickedButton}
          error={compilationError[clickedButton].error}
          message={compilationError[clickedButton].compileMessage}
          exitStatus={compilationError[clickedButton].exitStatus}
          sampleInput1={qArr[clickedButton].testCases[0].input}
          sampleInput2={qArr[clickedButton].testCases[1].input}
          sampleOutput1={qArr[clickedButton].testCases[0].expectedOutput}
          sampleOutput2={qArr[clickedButton].testCases[1].expectedOutput}
        />
      )}
    </div>
  );
}
