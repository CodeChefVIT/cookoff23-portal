import Question from "@/components/questions";
import questionData from "../../Dummy_Data";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <main>
        <Navbar />
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
      </main>
    </>
  );
}
