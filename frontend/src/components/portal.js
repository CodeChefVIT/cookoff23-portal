import Question from "@/components/questions";
import { useState } from "react";
import questionData, { compilationError } from "../../Dummy_Data";
import EditorWindow from "./EditorWindow";

export default function Portal() {
  const length = questionData.length;
  const [clickedButton, setClickedButton] = useState(0);
  function handleClick(index) {
    setClickedButton(index);
  }
  return (
    <div className="flex h-[86vh]">
      <div className="flex flex-col overflow-auto">
        {questionData.map((question, index) => (
          <button
            key={index}
            id="font_ITC"
            onClick={() => handleClick(index)}
            className={`bg-[#0D0D0D] text-[#b7ab98] text-2xl 2xl:w-8 lg:w-6 hover:bg-[#161616] `}
            style={{
              background: clickedButton === index && "#161616",
              height: `${(1 / length) * 94}%`,
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <Question
        objective={questionData[clickedButton].objective}
        points={questionData[clickedButton].points}
        task={questionData[clickedButton].task}
        inputFormat={questionData[clickedButton].inputFormat}
        outputFormat={questionData[clickedButton].outputFormat}
        sampleInput1={questionData[clickedButton].sampleInput[0]}
        sampleOutput1={questionData[clickedButton].sampleOutput[0]}
        sampleInput2={questionData[clickedButton].sampleInput[1]}
        sampleOutput2={questionData[clickedButton].sampleOutput[1]}
        explanation={questionData[clickedButton].explanation}
      />
      <EditorWindow
        questionId={clickedButton}
        clickedButton={clickedButton}
        error={compilationError[clickedButton].error}
        message={compilationError[clickedButton].compileMessage}
        exitStatus={compilationError[clickedButton].exitStatus}
      />
    </div>
  );
}
