import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { motion, useAnimation } from 'framer-motion';

const TextEditor = ({ questionId, setRunTestCases, setQuestionRun }) => {
  const files = {
    "script.py": {
      name: "Python",
      language: "python",
      value: "n = int(input())\ninteger_list = map(int, input().split())",
    },
    "script.java": {
      name: "Java",
      language: "java",
      value:
        "public class Solution {\n\tpublic static void main(String[] args) {\n\n\t}\n}",
    },
    "script.c": {
      name: "C",
      language: "c",
      value: "#include <stdio.h>\nint main(){\n\n}",
    },
    "script.cpp": {
      name: "Cpp",
      language: "cpp",
      value: "#include<iostream>\nclass Solution {\n\n}",
    },
    "script.js": {
      name: "JS",
      language: "javascript",
      value: "function processData(input){\n\n}",
    },
    "script.rs": {
      name: "Rust",
      language: "rust",
      value: "impl Solution{\n\n}",
    },
  };

  const [fileName, setFileName] = useState("script.py");
  const editorRef = useRef(null);
  const file = files[fileName];
  const [showMore, setShowMore] = useState(false);
  const [selectedOption, setSelectedOption] = useState("script.py");
  const options = [
    "script.java",
    "script.c",
    "script.cpp",
    "script.py",
    "script.js",
    "script.rs",
  ];

  useEffect(() => {
    const existingCodeData = JSON.parse(localStorage.getItem("codeData")) || {};
    const savedCode = existingCodeData[questionId] || "";

    if (editorRef.current) {
      editorRef.current.setValue(savedCode);
    }
  }, [questionId]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleEditorDidMount = (Editor, monaco) => {
    editorRef.current = Editor;
  };
  const getEditorValue = () => {
    const codeValue = editorRef.current.getValue();

    const existingCodeData = JSON.parse(localStorage.getItem("codeData")) || {};
    const updatedCodeData = {
      ...existingCodeData,
      [questionId]: codeValue,
    };
    localStorage.setItem("codeData", JSON.stringify(updatedCodeData));

    // alert(`Code for question ${questionId} stored in local storage.`);
  };
  const handleClick = () => {
    getEditorValue();
    setRunTestCases(true);
    setQuestionRun(prevSet => new Set([...prevSet, questionId]));
  };
  return (
    <div className="h-screen w-full">
      <div className="h-[48px] p-2 bg-[#0d0d0d]">
        <div className="max-w-[270px] ml-3">
          <div className="flex items-center justify-between">
            <label htmlFor="select" className="text-lg py-2 text-[#B5A996]">
              Language
            </label>

            <div className="relative">
              <div className="h-8 w-40 bg-[#0d0d0d] flex border border-gray-200 rounded items-center">
                <input
                  value={selectedOption}
                  name="select"
                  id="select"
                  className="px-2  appearance-none bg-[#0d0d0d] outline-none text-white w-full"
                  readOnly
                />

                <label
                  htmlFor="show_more"
                  className="cursor-pointer outline-none focus:outline-none border-l
                 border-gray-200 transition-all text-gray-300 hover:text-gray-600"
                >
                  <svg
                    className="w-4 h-4 mx-2 fill-current"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </label>
              </div>

              <input
                type="checkbox"
                name="show_more"
                id="show_more"
                className="hidden peer"
                checked={showMore}
                onChange={() => setShowMore(!showMore)}
              />
              {showMore && (
                <div
                  className="absolute rounded shadow bg-[#0d0d0d] overflow-hidden hidden peer-checked:flex 
              flex-col w-full mt-1 border border-gray-200 z-10"
                  style={{
                    maxHeight: "120px",
                    overflowY: "auto",
                  }}
                >
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="cursor-pointer group border-t"
                      onClick={() => handleOptionClick(option)}
                    >
                      <p
                        onClick={() => setFileName(option)}
                        className={`block p-2 border-transparent text-white border-l-4 group-hover:border-[#eb5939] ${
                          option === selectedOption
                            ? "border-[#eb5939] bg-bg-[#0d0d0d]"
                            : "group-hover:bg-[#1b1b1b]"
                        }`}
                      >
                        {option}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[80%] flex justify-center items-center bg-[#0d0d0d] relative">
        <Editor
          className=""
          height="90%"
          width="95%"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          path={file.name}
          defaultLanguage={file.language}
          defaultValue={file.value}
        />
      </div>
      <div className="h-[13.5%] flex justify-end bg-[#0d0d0d] mr-3 my-2">
        <button
          className="w-28 h-9 mr-4 rounded bg-[#242424] text-white hover:bg-[#1a1919]"
          onClick={handleClick}
        >
          run code
        </button>
        <button
          className="w-28 h-9 mr-2 rounded text-white bg-[#eb5939] hover:bg-red-500"
          onClick={handleClick}
        >
          Submit code
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
