import { Platform } from "react-native";
import useMobile from "../hooks/useMobile";
import TabNavigatorMobile from "./TabNavigator.mobile";
import TabNavigatorWeb from "./TabNavigator.web";

const TabNavigator = () => {
  const isMobile = useMobile();
  if (Platform.OS === "android" || Platform.OS === "ios" || isMobile) {
    return <TabNavigatorMobile />;
  } else {
    return <TabNavigatorWeb />;
  }
};

export default TabNavigator;
