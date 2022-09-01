import React from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  NavigationState,
} from "@react-navigation/native";

import * as Analytics from "expo-firebase-analytics";

import LinkingConfiguration from "./LinkingConfiguration";
import useMobile from "../hooks/useMobile";
import TabNavigatorWeb from "./TabNavigatorWeb";
import TabNavigatorMobile from "./TabNavigatorMobile";
import { ActivityIndicator } from "react-native";

export default function Navigation() {
  return (
    <NavigationContainer
      documentTitle={{
        formatter: (options, route) => "Agustin Vazquez",
      }}
      linking={LinkingConfiguration}
      fallback={<ActivityIndicator />}
      onStateChange={(state) => {
        if (state === null || state === undefined) return;
        const tabRoute = getActiveRouteState(state);
        const currentRoute = getFocusedRouteNameFromRoute(tabRoute);

        Analytics.logEvent(currentRoute || tabRoute.name).catch((error) =>
          console.log(error)
        );
      }}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const getActiveRouteState = function (route: NavigationState): NavigationState {
  if (
    !route.routes ||
    route.routes.length === 0 ||
    route.index >= route.routes.length
  ) {
    return route;
  }

  const childActiveRoute = route.routes[route.index] as NavigationState;
  const result = getActiveRouteState(childActiveRoute);
  return result;
};

function RootNavigator() {
  const isMobilePhone = useMobile();
  if (isMobilePhone) {
    return <TabNavigatorMobile />;
  } else {
    return <TabNavigatorWeb />;
  }
}
