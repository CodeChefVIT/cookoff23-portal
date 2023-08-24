import Navbar from "@/components/Navbar";
import Portal from "@/components/portal";
import { ResizableBox } from "react-resizable";

export default function Home() {
  return (
    <>
      <main>
        <Navbar />
        <ResizableBox>
        <div><Portal /></div>
          
        </ResizableBox>
      </main>
    </>
  );
}
