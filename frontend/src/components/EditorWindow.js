import TextEditor from "./textEditor";
import TestCase from "./TestCase";
import { useState } from "react";
function EditorWindow(props) {
  const [runTestCases, setRunTestCases] = useState(false);

  return (
    <div className="w-[60%] overflow-auto">
      <TextEditor
        questionId={props.questionId}
        setRunTestCases={setRunTestCases}
      />
      <TestCase
        clickedButton={props.clickedButton}
        runTestCases={runTestCases}
      />
    </div>
  );
}
export default EditorWindow;
