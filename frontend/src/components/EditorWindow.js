import TextEditor from "./textEditor";
import TestCase from "./TestCase";
import { useEffect, useState } from "react";
import CompilationError from "./compError";
import SubmitCode from "./submissions";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import useTimerStore from "@/store/timeProvider";
import RefreshToken from "@/utils/RefreshToken";
import axios from "axios";

function EditorWindow(props) {
  const { sampleOutputs, sampleInputs, qArr } = props;
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
  const [subLoading, setSubLoading] = useState(false);
  const [code, setCode] = useState(null);
  const [program, setProgram] = useState(null);
  const [submissionArray, setSubmissionArray] = useState(null);

  useEffect(() => {
    console.log("submissionArray:", submissionArray);
    if (submissionArray !== null) {
      console.log("yes");
      setSubLoading(false);
    }
  }, [submissionArray]);

  useEffect(() => {
    if (initialTime === 0) {
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      useTimerStore.setState({ Time: 2 * 60 * 60 });
      RefreshToken();
      router.push(fullPath);
    }
  }, [initialTime]);

  useEffect(() => {
    const storedData = Cookies.get(String(props.questionId + 1));
    const storedData2 = Cookies.get(String(props.questionId + 10));

    if (storedData) {
      const runData = JSON.parse(storedData);
      const allRunDataValid = runData.every(
        (submission) => submission.status_id === 3 || submission.status_id === 4
      );

      setLoading(false);
      setError(!allRunDataValid);
      setRunData(runData);
    }

    if (storedData2) {
      setSubmissionArray(JSON.parse(storedData2));
    }
  }, [props.questionId]);

  useEffect(() => {
    function fetchSubmissionStatus(string) {
      console.log(props.questionId);
      try {
        axios
          .get(
            "http://139.59.4.43:2358/submissions/batch?tokens=" +
              string.toString() +
              "&base64_encoded=false&fields=status_id,stdout,expected_output,stdin,stderr,compile_output,source_code"
          )
          .then((response) => {
            const submissions = response.data.submissions;

            if (
              submissions.some(
                (submission) =>
                  submission.status_id === 1 || submission.status_id === 2
              )
            ) {
              setLoading(true);
              setTimeout(() => {
                fetchSubmissionStatus(str);
              }, 3000);
            } else if (
              submissions.every(
                (submission) =>
                  submission.status_id === 3 || submission.status_id === 4
              )
            ) {
              setError(false);
              setLoading(false);
              setRunData(submissions);
              Cookies.set(
                String(props.questionId + 1),
                JSON.stringify(submissions)
              );
            } else {
              setLoading(false);
              setError(true);
              setRunData(submissions);
              Cookies.set(
                String(props.questionId + 1),
                JSON.stringify(submissions)
              );
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
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    useTimerStore.setState({ Time: 2 * 60 * 60 });
    RefreshToken();
    router.push(fullPath);
  }

  return (
    <div className="w-[60%] overflow-auto">
      <TextEditor
        setSubLoading={setSubLoading}
        qArr={qArr}
        setSubmissionArray={setSubmissionArray}
        questionId={props.questionId}
        setRunTestCases={setRunTestCases}
        setQuestionRun={setQuestionRun}
        setQuestionSubmit={setQuestionSubmit}
        setRunTokens={setRunTokens}
        setQuestionQuestionRunArray={setQuestionQuestionRunArray}
        questionRunArray={questionRunArray}
        questionRun={questionRun}
        questionSubmit={questionSubmit}
        expectedOutputs={sampleOutputs}
        inputs={sampleInputs}
        setCode={setCode}
        setProgram={setProgram}
      />
      {!loading &&
        !error &&
        runData.length > 0 &&
        questionRunArray.has(props.questionId) &&
        !subLoading && (
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

      {subLoading && (
        <div className="text-white flex justify-center">
          <p>Cooking...</p>
        </div>
      )}

      {error && !loading && questionRunArray.has(props.questionId) && (
        <div className="h-fit px-5 pb-5">
          <CompilationError runTestCases={runTestCases} runData={runData} />
        </div>
      )}
      {questionSubmit.has(props.questionId) &&
        !subLoading &&
        submissionArray !== null && (
          <SubmitCode
            clickedButton={props.clickedButton}
            submissionArray={submissionArray}
          />
        )}
      {questionSubmit.size === qArr.length && !subLoading && (
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
