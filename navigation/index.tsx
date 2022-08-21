import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import LinkingConfiguration from "./LinkingConfiguration";
import useMobile from "../hooks/useMobile";
import TabNavigatorWeb from "./TabNavigatorWeb";
import TabNavigatorMobile from "./TabNavigatorMobile";

export default function Navigation() {
  return (
    <NavigationContainer
      documentTitle={{
        formatter: (options, route) => "Agustin Vazquez",
      }}
      linking={LinkingConfiguration}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

function RootNavigator() {
  const isMobilePhone = useMobile();
  if (isMobilePhone) {
    return <TabNavigatorMobile />;
  } else {
    return <TabNavigatorWeb />;
  }
}
