import { useEffect, useState } from "react";

const useWindow = () => {
  const [currentWindow, setWindow] = useState<Window>(window);

  function handleWindowSizeChange() {
    setWindow(window);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return currentWindow;
};

export default useWindow;
