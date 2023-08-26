import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function CompilationError(props) {
  const { message, exitStatus } = props;
  return (
    <div className="bg-[#161616] w-full h-fit">
      <div className="pl-5 py-4">
        <h1 className="text-[#CC3333] text-xl">Compilation Error :(</h1>
      </div>
      <div className=" text-[#c1bbb3] px-5">
        <p className="bg-[#0D0D0D] py-1 pl-3">Check the compiler output, fix the error and try again.</p>
      </div>
      <div className="px-5 text-[#c1bbb3] py-3">
        <p className="font-semibold">Compile Message</p>
        <div className="bg-[#0D0D0D] py-2 pl-3">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
        </div>
      </div>
      <div className="text-[#c1bbb3] px-5">
        <p className="font-semibold">Exit Status</p>
        <div className="bg-[#0D0D0D] py-3 pl-3">{exitStatus}</div>
      </div>
      <div>&nbsp;</div>
    </div>
  );
}

export default CompilationError;
