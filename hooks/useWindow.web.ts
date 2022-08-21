import { useEffect, useLayoutEffect, useState } from "react";

const useWindowSize = () => {
  const [currentWindow, setWindow] = useState(window);
  useEffect(() => {
    function updateSize() {
      setWindow(window);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return currentWindow;
};

export default useWindowSize;
