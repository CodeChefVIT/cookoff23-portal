import TextEditor from "./textEditor";
import TestCase from "./TestCase";
import { useState } from "react";
import CompilationError from "./compError";
import SubmitCode from "./submissions";
import questionData from "../../Dummy_Data";
import { useRouter } from "next/router";

function EditorWindow(props) {
  const router = useRouter();
  const [runTestCases, setRunTestCases] = useState(false);
  const [questionRun, setQuestionRun] = useState(new Set());
  const [questionSubmit, setQuestionSubmit] = useState(new Set());

  function submitQuestions() {
    const user = router.query.user;
    const fullPath = `/${user}/Testcomplete`;
    router.push(fullPath);
  }

  return (
    <div className="w-[60%] overflow-auto">
      <TextEditor
        questionId={props.questionId}
        setRunTestCases={setRunTestCases}
        setQuestionRun={setQuestionRun}
        setQuestionSubmit={setQuestionSubmit}
        questionRun={questionRun}
        questionSubmit={questionSubmit}
      />
      {!props.error && questionRun.has(props.questionId) && (
        <TestCase clickedButton={props.clickedButton} />
      )}

      {props.error && questionRun.has(props.questionId) && (
        <div className="h-fit px-5 pb-5">
          <CompilationError
            runTestCases={runTestCases}
            message={props.message}
            exitStatus={props.exitStatus}
          />
        </div>
      )}
      {!props.error && questionSubmit.has(props.questionId) && (
        <SubmitCode clickedButton={props.clickedButton} />
      )}
      {questionSubmit.size === questionData.length && (
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
