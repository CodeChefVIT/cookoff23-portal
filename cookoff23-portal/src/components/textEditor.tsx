import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";

const TextEditor = () => {
   const maxLines = 10;
  const [codeValue, setCodeValue] = useState("//comment"); 
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCodeValue(value); 
      const currentLines = value.split("\n").length;
    if (currentLines > maxLines) {
      setIsInputDisabled(true);
      return;
    }
    
    setCodeValue(value);
  }
  console.log(value);
  };

  return (
    <Editor
      className="px-5 my-5"
      height="80%"
      width="100%"
      theme="vs-dark"
      defaultLanguage="javascript" 
      defaultValue="// Start coding here..."
      value={codeValue} 
      onChange={handleEditorChange} 
      options={{
        scrollBeyondLastLine: false,
        readOnly: isInputDisabled, 
      }}
    />
  );
};

export default TextEditor;
