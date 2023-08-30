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

      <Question
        objective={questionData[1].qdata[clickedButton].objective}
        points={questionData[1].qdata[clickedButton].points}
        task={questionData[1].qdata[clickedButton].task}
        inputFormat={questionData[1].qdata[clickedButton].inputFormat}
        outputFormat={questionData[1].qdata[clickedButton].outputFormat}
        sampleInput1={questionData[1].qdata[clickedButton].sampleInput[0]}
        sampleOutput1={questionData[1].qdata[clickedButton].sampleOutput[0]}
        sampleInput2={questionData[1].qdata[clickedButton].sampleInput[1]}
        sampleOutput2={questionData[1].qdata[clickedButton].sampleOutput[1]}
        explanation={questionData[1].qdata[clickedButton].explanation}
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
