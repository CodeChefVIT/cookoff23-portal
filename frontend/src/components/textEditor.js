import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";

const TextEditor = ({ questionId }) => {
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
    "script.c++": {
      name: "C++",
      language: "c++",
      value: "",
    },
  };

  const [fileName, setFileName] = useState("script.py");
  const editorRef = useRef(null);
  const file = files[fileName];
  const [showMore, setShowMore] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Javascript");
  const options = ["script.java", "script.c", "script.c++", "script.py"];

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

  return (
    <div className="h-screen w-7/12">
      <div className="h-[48px] p-3 bg-[#0d0d0d]">
        <div className="max-w-[330px] mx-auto">
          <div className="flex items-center justify-between">
            <label htmlFor="select" className="text-lg py-2 text-[#B5A996]">
              Language:
            </label>

            <div className="relative">
              <div className="h-8 w-40 bg-white flex border border-gray-200 rounded items-center">
                <input
                  value={selectedOption}
                  name="select"
                  id="select"
                  className="px-4 appearance-none outline-none text-gray-800 w-full"
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
                  className="absolute rounded shadow bg-white overflow-hidden hidden peer-checked:flex 
              flex-col w-full mt-1 border border-gray-200 z-10"
                >
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="cursor-pointer group border-t"
                      onClick={() => handleOptionClick(option)}
                    >
                      <button
                        onClick={() => setFileName(option)}
                        className={`block p-2 border-transparent border-l-4 group-hover:border-blue-600 ${
                          option === selectedOption
                            ? "border-blue-600 bg-gray-100"
                            : "group-hover:bg-gray-100"
                        }`}
                      >
                        {option}
                      </button>
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
      <div className="h-[13.5%] flex justify-end bg-[#0d0d0d]">
        <button
          className="w-28 h-9 mr-4 rounded bg-[#eb5939] hover:bg-red-500"
          onClick={getEditorValue}
        >
          run code
        </button>
        <button className="w-28 h-9 mr-2 rounded bg-[#eb5939] hover:bg-red-500">
          Submit code
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
