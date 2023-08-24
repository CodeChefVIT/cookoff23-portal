import Question from "@/components/questions";
import questionData from "../../Dummy_Data";
import Navbar from "@/components/Navbar";
import TextEditor from "../components/textEditor";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex">
        <div className="w-[40%]">
          <Question
            objective={questionData.objective}
            points={questionData.points}
            task={questionData.task}
            inputFormat={questionData.inputFormat}
            outputFormat={questionData.outputFormat}
            sampleInput1={questionData.sampleInput[0]}
            sampleOutput1={questionData.sampleOutput[0]}
            sampleInput2={questionData.sampleInput[1]}
            sampleOutput2={questionData.sampleOutput[1]}
            explanation={questionData.explanation}
          />
        </div>
        <div className="w-[60%]">
          <TextEditor />
        </div>
      </main>
    </>
  );
}
