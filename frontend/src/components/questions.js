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
    outputFormat,
    sampleInputs,
    sampleOutputs,
    explanations,
    constraints,
  } = props;

  const inputElements = [];

  for (let i = 0; i < sampleInputs.length; i++) {
    inputElements.push(i);
  }

  return (
    <div className="bg-[#161616] text-[#B5A996] w-[40%] h-[82vh] overflow-auto">
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
          {points + " points"}
        </div>
        <div className="text-[#EB5939] font-semibold py-3 text-lg" id="problem">
          Problem
        </div>
        <div className="break-normal pr-2">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{task}</ReactMarkdown>
        </div>
        <div>
          <h2 className="font-semibold my-2">Input format</h2>
          {inputFormat.map((format, index) => (
            <ReactMarkdown remarkPlugins={[remarkGfm]} key={index}>
              {format}
            </ReactMarkdown>
          ))}
        </div>
        {outputFormat.length > 0 && (
          <div>
            <h2 className="font-semibold my-2">Output format</h2>
            {outputFormat.map((format, index) => (
              <ReactMarkdown remarkPlugins={[remarkGfm]} key={index}>
                {format}
              </ReactMarkdown>
            ))}
          </div>
        )}
        {inputElements.map((input, index) => (
          <div key={index}>
            {sampleInputs[input] !== null &&
              sampleInputs[input] !== undefined &&
              sampleInputs[input] !== "" && (
                <div>
                  <h2 className="font-semibold my-2">
                    Sample Input {index + 1}
                  </h2>
                  <div className="bg-neutral-800 rounded-sm whitespace-pre pl-2 py-2 flex justify-between">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {sampleInputs[input]}
                    </ReactMarkdown>
                    <button
                      className="self-start pr-1"
                      onClick={() => {
                        navigator.clipboard.writeText(sampleInputs[input]);
                      }}
                    >
                      <Image src={copy} alt="copy" height={20} width={15} />
                    </button>
                  </div>
                </div>
              )}
            {sampleOutputs[input] !== null &&
              sampleOutputs[input] !== undefined &&
              sampleOutputs[input] !== "" && (
                <div>
                  <h2 className="font-semibold my-2">
                    Sample Output {index + 1}
                  </h2>
                  <div className="bg-neutral-800 rounded whitespace-pre pl-2 py-2">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {sampleOutputs[input]}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            {explanations[input] !== null &&
              explanations[input] !== undefined &&
              explanations[input] !== "" && (
                <div>
                  <h2 className="font-semibold my-2 mt-3">Explanation</h2>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {explanations[input]}
                  </ReactMarkdown>
                </div>
              )}
          </div>
        ))}
        <div>
          <h2 className="font-semibold my-2 mt-3">Constraints</h2>
          <ul>
            {constraints !== null &&
              constraints.map((format, index) => (
                <li>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} key={index}>
                    {format}
                  </ReactMarkdown>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Question;
