import { Platform } from "react-native";
import useMobile from "../hooks/useMobile";
import TabNavigatorMobile from "./TabNavigatorMobile";
import TabNavigatorWeb from "./TabNavigatorWeb";

const TabNavigator = () => {
  const isMobile = useMobile();
  if (Platform.OS === "android" || Platform.OS === "ios" || isMobile) {
    return <TabNavigatorMobile />;
  } else {
    return <TabNavigatorWeb />;
  }
};

export default TabNavigator;
