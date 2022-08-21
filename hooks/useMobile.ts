import { useWindowDimensions } from "react-native";
import { Platform } from "react-native";

const useMobile = () => {
  const { width } = useWindowDimensions();
  const isMobileDevice =
    Platform.OS === "android" || Platform.OS === "ios" || width <= 768;

  return isMobileDevice;
};

export default useMobile;
