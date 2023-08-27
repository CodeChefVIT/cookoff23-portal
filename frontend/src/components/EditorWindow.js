import TextEditor from "./textEditor";
import TestCase from "./TestCase";
import { useState } from "react";
import CompilationError from "./compError";
import SubmitCode from "./submissions";
function EditorWindow(props) {
  const [runTestCases, setRunTestCases] = useState(false);
  const [questionRun, setQuestionRun] = useState(new Set());
  const [questionSubmit, setQuestionSubmit] = useState(new Set());
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
    </div>
  );
}
export default EditorWindow;
