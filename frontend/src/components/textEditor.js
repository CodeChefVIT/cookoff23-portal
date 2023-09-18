import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import Cookies from "js-cookie";
import RefreshToken from "@/utils/RefreshToken";

const TextEditor = ({
  questionId,
  setRunTestCases,
  setQuestionRun,
  setQuestionSubmit,
  setInvalidInput,
  questionRun,
  submitInvalidInput,
  questionSubmit,
  expectedOutputs,
  inputs,
  setRunTokens,
  questionRunArray,
  setQuestionQuestionRunArray,
  setCode,
  setProgram,
  qArr,
  setSubmissionArray,
  setSubLoading,
}) => {
  const files = {
    "script.py": {
      name: "Python",
      language: "python",
      value: "print('Hello, world!')",
      code: 71,
    },
    "script.java": {
      name: "Java",
      language: "java",
      value:
        "public class Main {\n\tpublic static void main(String[] args) {\n\n\t}\n}",
      code: 62,
    },
    "script.c": {
      name: "C",
      language: "c",
      value: "#include <stdio.h>\nint main(){\n\treturn 0;\n}",
      code: 50,
    },
    "script.cpp": {
      name: "Cpp",
      language: "cpp",
      value:
        "#include<iostream>\nusing namespace std;\n\nint main() {\n\treturn 0;\n}",
      code: 54,
    },
    "script.js": {
      name: "JS",
      language: "javascript",
      value: "function processData(input){\n\n}",
      code: 63,
    },
    "script.rs": {
      name: "Rust",
      language: "rust",
      value: "impl Solution{\n\n}",
      code: 73,
    },
  };

  // const initialTime = useTimerStore((state) => state.Time);

  const [selectedLanguages, setSelectedLanguages] = useState({});
  const [langCode, setLangCode] = useState(null);
  const [fileName, setFileName] = useState("script.py");
  const editorRef = useRef(null);
  const file = files[fileName];
  const [codeValue, setCodeValue] = useState(file.value);
  const [showMore, setShowMore] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});

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

    const existingCodeData = JSON.parse(localStorage.getItem("codeData")) || {};
    const updatedCodeData = {
      ...existingCodeData,
      [questionId]: value,
    };
    setProgram(updatedCodeData[questionId]);
    localStorage.setItem("codeData", JSON.stringify(updatedCodeData));
  };

  // useEffect(() => {
  //   if (initialTime === 1) {
  //   }
  // }, [initialTime]);

  const isCodeEmpty = (code) => {
    return code.trim() === "";
  };

  useEffect(() => {
    const existingCodeData = JSON.parse(localStorage.getItem("codeData")) || {};
    const savedCode = existingCodeData[questionId] || "";

    if (editorRef.current) {
      if (isCodeEmpty(savedCode)) {
        editorRef.current.setValue(files["script.py"].value);

        const updatedCodeData = {
          ...existingCodeData,
          [questionId]: files["script.py"].value,
        };
        localStorage.setItem("codeData", JSON.stringify(updatedCodeData));
      } else {
        editorRef.current.setValue(savedCode);
      }
    }
  }, [questionId]);

  useEffect(() => {
    const selectedLanguage = selectedLanguages[questionId];
    if (selectedLanguage) {
      setFileName(selectedLanguage);
    } else {
      setSelectedLanguages({ ...selectedLanguages, [questionId]: "script.py" });
    }
  }, [questionId, selectedLanguages]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowMore(false);

    setSelectedLanguages((prevSelectedLanguages) => ({
      ...prevSelectedLanguages,
      [questionId]: option,
    }));

    setCodeValue(files[option].value);
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
  const handleClickRun = async () => {
    await RefreshToken();
    console.log(localStorage.getItem("access_token"));
    getEditorValue();
    const existingCodeData = JSON.parse(localStorage.getItem("codeData"));
    const codeValue = existingCodeData[questionId];
    const langCode = file.code;
    setCode(langCode);
    try {
      const response = await axios.post(
        "http://139.59.4.43:2358/submissions/batch?base64_encoded=false",
        {
          submissions: inputs.map((input, index) => ({
            language_id: langCode,
            source_code: codeValue,
            stdin: input,
            expected_output: expectedOutputs[index],
          })),
        }
      );

      console.log(response.data);
      if (response.status === 201) {
        await setInvalidInput(false);
        setRunTokens(response.data);
        setRunTestCases(true);
        if (questionSubmit.has(questionId)) {
          setQuestionRun(questionId);
          setQuestionQuestionRunArray((prev) => new Set(prev.add(questionId)));
          setQuestionSubmit((prev) => {
            const newSet = new Set(prev);
            newSet.delete(questionId);
            return newSet;
          });
        } else {
          setQuestionRun(questionId);
          setQuestionQuestionRunArray((prev) => new Set(prev.add(questionId)));
        }
      }
    } catch (error) {
      if (error.response.status === 401) {
        await RefreshToken();
      } else if (error.response.status === 422) {
        console.log("Invalid input");
        setInvalidInput(true);
      }
      console.log(error);
    }
  };

  async function handleClickSubmit() {
    try {
      setSubLoading(true);
      await RefreshToken();
      getEditorValue();
      const access_token = localStorage.getItem("access_token");
      const existingCodeData = JSON.parse(localStorage.getItem("codeData"));
      const codeValue = existingCodeData[questionId];
      const langCode = file.code;
      const q_ID = qArr[questionId]._id;
      console.log(q_ID);
      console.log(codeValue);
      console.log(langCode);
      const response = await axios.post(
        "https://api-cookoff-prod.codechefvit.com/submit/eval/",
        {
          question_id: q_ID,
          code: codeValue,
          language_id: langCode,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 201) {
        await setInvalidInput(false);
        setSubmissionArray(response.data);
        Cookies.set(String(questionId + 10), JSON.stringify(response.data));
      }
      if (questionRunArray.has(questionId)) {
        setQuestionSubmit((prev) => new Set(prev.add(questionId)));
        setQuestionRun(null);
        setQuestionQuestionRunArray((prev) => {
          const newSet = new Set(prev);
          newSet.delete(questionId);
          return newSet;
        });
      } else {
        setQuestionSubmit((prev) => new Set(prev.add(questionId)));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await RefreshToken();
        handleClickSubmit();
      } else if (error.response.status === 400) {
        console.log("Invalid input");
        setSubLoading(false);
        if (codeValue === "" || codeValue === undefined || codeValue === null) {
          submitInvalidInput(true);
        }
      }
    }
  }

  return (
    <div className="h-[90vh] w-full mb-7 2xl:mb-4">
      <div className="h-[48px] p-2 bg-[#0d0d0d]">
        <div className="max-w-[270px] ml-3">
          <div className="flex items-center justify-between">
            <label htmlFor="select" className="text-lg py-2 text-[#B5A996]">
              Language
            </label>

            <div className="relative">
              <div className="h-8 w-40 bg-[#0d0d0d] flex border border-gray-200 rounded items-center">
                <input
                  value={selectedLanguages[questionId] || "select"}
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
                    <polyline points="6 9 12 15 18 9" />
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
