import { useEffect, useState } from "react";
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
};
export default useMousePosition;
