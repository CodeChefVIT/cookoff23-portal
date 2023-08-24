import Navbar from "@/components/Navbar";
import TextEditor from "../components/textEditor";
import Portal from "@/components/portal";
import { ResizableBox } from "react-resizable";

export default function Home() {
  return (
    <>
      <main>
        <Navbar />
        <Portal />
        
      </main>
    </>
  );
}
