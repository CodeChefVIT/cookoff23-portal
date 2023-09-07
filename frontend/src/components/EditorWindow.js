import TextEditor from "./textEditor";
import TestCase from "./TestCase";
import { useEffect, useState } from "react";
import CompilationError from "./compError";
import SubmitCode from "./submissions";
import questionData from "../../Dummy_Data";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import useTimerStore from "@/store/timeProvider";
import axios from "axios";

function EditorWindow(props) {
  const { sampleOutput1, sampleOutput2, sampleInput1, sampleInput2, qArr } =
    props;
  const router = useRouter();
  const initialTime = useTimerStore((state) => state.Time);
  const user = router.query.user;
  const fullPath = `/user/Testcomplete`;
  const [runTestCases, setRunTestCases] = useState(false);
  const [questionRun, setQuestionRun] = useState(null);
  const [questionSubmit, setQuestionSubmit] = useState(new Set());
  const [questionRunArray, setQuestionQuestionRunArray] = useState(new Set());
  const [runTokens, setRunTokens] = useState([]);
  const [runData, setRunData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const [program, setProgram] = useState(null);

  useEffect(() => {
    if (initialTime === 0) {
      Cookies.remove("timerTime");
      router.push(fullPath);
    }
  }, [initialTime]);

  useEffect(() => {
    function fetchSubmissionStatus(string) {
      try {
        axios
          .get(
            "http://139.59.4.43:2358/submissions/batch?tokens=" +
              string.toString() +
              "&base64_encoded=false&fields=status_id,stdout,expected_output,stdin,stderr,compile_output,source_code"
          )
          .then((response) => {
            console.log(response.data);
            if (
              response.data.submissions[0].status_id === 1 ||
              response.data.submissions[1].status_id === 1 ||
              response.data.submissions[0].status_id === 2 ||
              response.data.submissions[1].status_id === 2
            ) {
              setLoading(true);
              setTimeout(() => {
                fetchSubmissionStatus(str);
              }, 3000);
            } else if (
              (response.data.submissions[0].status_id === 3 ||
                response.data.submissions[0].status_id === 4) &&
              (response.data.submissions[1].status_id === 3 ||
                response.data.submissions[1].status_id === 4)
            ) {
              setError(false);
              setLoading(false);
              setRunData(response.data.submissions);
            } else {
              setLoading(false);
              setError(true);
              setRunData(response.data.submissions);
            }
          });
      } catch {
        (error) => {
          console.log(error);
        };
      }
    }
    let str = [];
    runTokens.forEach((element) => {
      str.push(element.token);
    });
    console.log(str.toString());
    if (runTokens.length > 0) {
      fetchSubmissionStatus(str);
    }
  }, [runTokens]);

  function submitQuestions() {
    Cookies.remove("timerTime");
    router.push(fullPath);
  }

  return (
    <div className="w-[60%] overflow-auto">
      <TextEditor
        questionId={props.questionId}
        setRunTestCases={setRunTestCases}
        setQuestionRun={setQuestionRun}
        setQuestionSubmit={setQuestionSubmit}
        setRunTokens={setRunTokens}
        setQuestionQuestionRunArray={setQuestionQuestionRunArray}
        questionRunArray={questionRunArray}
        questionRun={questionRun}
        questionSubmit={questionSubmit}
        expectedOutput1={sampleOutput1}
        expectedOutput2={sampleOutput2}
        input1={sampleInput1}
        input2={sampleInput2}
        setCode={setCode}
        setProgram={setProgram}
      />
      {!loading &&
        !error &&
        runData.length > 0 &&
        questionRun === props.questionId && (
          <TestCase
            clickedButton={props.clickedButton}
            runData={runData}
            code={code}
            program={program}
          />
        )}

      {loading && (
        <div className="text-white flex justify-center">
          <p>Cooking...</p>
        </div>
      )}

      {error && !loading && questionRun === props.questionId && (
        <div className="h-fit px-5 pb-5">
          <CompilationError runTestCases={runTestCases} runData={runData} />
        </div>
      )}
      {questionSubmit.has(props.questionId) && (
        <SubmitCode clickedButton={props.clickedButton} />
      )}
      {questionSubmit.size === qArr.length && (
        <div className="flex justify-end mr-5 mb-10">
          <button
            className="text-white font-bold bg-[#1BA94C] rounded-[4px] px-5 py-2"
            onClick={submitQuestions}
          >
            Submit These Solutions
          </button>
        </div>
      )}
    </div>
  );
}
export default EditorWindow;
