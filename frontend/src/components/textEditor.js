import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import useTimerStore from "@/store/timeProvider";

const TextEditor = ({
  questionId,
  setRunTestCases,
  setQuestionRun,
  setQuestionSubmit,
  questionRun,
  questionSubmit,
}) => {
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

  // const initialTime = useTimerStore((state) => state.Time);
  const [selectedLanguages, setSelectedLanguages] = useState({});
  const [fileName, setFileName] = useState("script.py");
  const editorRef = useRef(null);
  const file = files[fileName];
  const [codeValue, setCodeValue] = useState(file.value);
  const [showMore, setShowMore] = useState(false);
  const [selectedOption, setSelectedOption] = useState("py");

  const options = [
    "script.java",
    "script.c",
    "script.cpp",
    "script.py",
    "script.js",
    "script.rs",
  ];

  // const [isChecked, setIsChecked] = useState(false);

  const handleEditorChange = (value, event) => {
    setCodeValue(value);

    // Save code value to local storage
    const existingCodeData = JSON.parse(localStorage.getItem("codeData")) || {};
    const updatedCodeData = {
      ...existingCodeData,
      [questionId]: value,
    };
    localStorage.setItem("codeData", JSON.stringify(updatedCodeData));
  };

  // useEffect(() => {
  //   if (initialTime === 1) {
  //   }
  // }, [initialTime]);

  useEffect(() => {
    const existingCodeData = JSON.parse(localStorage.getItem("codeData")) || {};
    const savedCode = existingCodeData[questionId] || "";

    if (editorRef.current) {
      editorRef.current.setValue(savedCode);
    }
  }, [questionId]);

  useEffect(() => {
    // Retrieve the selected language from state for the current question
    const selectedLanguage = selectedLanguages[questionId];
    if (selectedLanguage) {
      setFileName(selectedLanguage);
    }
  }, [questionId, selectedLanguages]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowMore(false);

    setSelectedLanguages((prevSelectedLanguages) => ({
      ...prevSelectedLanguages,
      [questionId]: option,
    }));
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
    console.log(codeValue);

    // alert(`Code for question ${questionId} stored in local storage.`);
  };
  const handleClickRun = () => {
    getEditorValue();
    setRunTestCases(true);
    if (questionSubmit.has(questionId)) {
      setQuestionRun((prev) => new Set(prev.add(questionId)));
      setQuestionSubmit((prev) => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });
    } else {
      setQuestionRun((prev) => new Set(prev.add(questionId)));
    }
  };

  const handleClickSubmit = () => {
    getEditorValue();
    if (questionRun.has(questionId)) {
      setQuestionSubmit((prev) => new Set(prev.add(questionId)));
      setQuestionRun((prev) => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });
    } else {
      setQuestionSubmit((prev) => new Set(prev.add(questionId)));
    }
  };

  return (
    <div className="h-[90vh] w-full mb-7">
      <div className="h-[48px] p-2 bg-[#0d0d0d]">
        <div className="max-w-[270px] ml-3">
          <div className="flex items-center justify-between">
            <label htmlFor="select" className="text-lg py-2 text-[#B5A996]">
              Language
            </label>

            <div className="relative">
              <div className="h-8 w-40 bg-[#0d0d0d] flex border border-gray-200 rounded items-center">
                <input
                  value={file.name}
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
                        {option.substring(option.lastIndexOf(".") + 1)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Editor
        className="px-5 my-5"
        height="80%"
        width="100%"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
        value={codeValue}
        onChange={handleEditorChange}
        options={{
          scrollBeyondLastLine: false,
        }}
      />
      <div className="bg-[#0d0d0d] relative mt-4">
        <div id="heading" className="flex justify-end items-center">
          <div className="flex font-bold text-[16px]">
            <button
              className="px-14 py-2 mx-5 rounded bg-[#242424] text-white hover:bg-[#1a1919]"
              onClick={handleClickRun}
            >
              Run Code
            </button>
            <button
              className="px-14 py-2 mr-5 rounded text-white bg-[#eb5939] hover:bg-red-500"
              onClick={handleClickSubmit}
            >
              Submit Code
            </button>
          </div>
        </div>
        {/* {isChecked && (
          <div className="bg-[#0d0d0d] flex p-4 mt-1 my-2">
            <textarea
              placeholder="Type Custom Input Here..."
              id="cascadia"
              className="text-white w-full py-2 px-5 ml-1 bg-[#2C2C2C] placeholder:opacity-50 placeholder-[#878787] resize-none"
              htmlFor="input"
            >
              {}
            </textarea>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TextEditor;
