import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import copy from "./../assets/copy.png";

function Question(props) {
  const {
    objective,
    points,
    task,
    inputFormat,
    outputformat,
    sampleInput1,
    sampleOutput1,
    sampleInput2,
    sampleOutput2,
    explanation,
  } = props;

  return (
    <div className="bg-[#161616] text-[#B5A996] w-[40%] h-[85vh] overflow-auto">
      <div className="pl-5 flex-1 p-4">
        <div
          className="text-2xl uppercase text-[#B6AA97] font-semibold"
          id="Heading"
        >
          <h1>{objective}</h1>
        </div>
        <div
          className="bg-[#EDEDED] w-fit text-black rounded px-2 my-2 font-semibold"
          id="points"
        >
          {points}
        </div>
        <div className="text-[#EB5939] font-semibold py-3 text-lg" id="problem">
          Problem
        </div>
        <div className="break-normal pr-2">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{task}</ReactMarkdown>
        </div>
        <div>
          <h2 className="font-semibold my-2">Input format</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {inputFormat}
          </ReactMarkdown>
        </div>
        <div>
          <h2 className="font-semibold my-2">Output format</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {outputformat}
          </ReactMarkdown>
        </div>
        <div>
          <h2 className="font-semibold my-2">Sample Input 1</h2>
          <div className="bg-neutral-800 rounded-sm whitespace-pre pl-2 py-2 flex justify-between">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {sampleInput1}
            </ReactMarkdown>
            <button
              className="self-start pr-1"
              onClick={() => {
                navigator.clipboard.writeText(sampleInput1);
              }}
            >
              <Image src={copy} alt="copy" height={20} width={15} />
            </button>
          </div>
          <h2 className="font-semibold my-2">Sample Output 1</h2>
          <div className="bg-neutral-800 rounded whitespace-pre pl-2 py-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {sampleOutput1}
            </ReactMarkdown>
          </div>
          <h2 className="font-semibold my-2">Sample Input 2</h2>
          <div className="bg-neutral-800 rounded-sm whitespace-pre pl-2 py-2 flex justify-between">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {sampleInput2}
            </ReactMarkdown>
            <button
              className="self-start pr-1"
              onClick={() => {
                navigator.clipboard.writeText(sampleInput2);
              }}
            >
              <Image src={copy} alt="copy" height={20} width={15} />
            </button>
          </div>
          <h2 className="font-semibold my-2">Sample Output 2</h2>
          <div className="bg-neutral-800 rounded whitespace-pre pl-2 py-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {sampleOutput2}
            </ReactMarkdown>
          </div>
        </div>
        <div>
          <h2 className="font-semibold my-2 mt-3">Explanation</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {explanation}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default Question;
