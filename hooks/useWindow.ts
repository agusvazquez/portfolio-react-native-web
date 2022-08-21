import { Dimensions } from "react-native";

const useWindow = () => {
  const window = Dimensions.get("window");
  return {
    innerHeight: window.height,
    innerWidth: window.width,
  };
};

export default useWindow;
