import React, { useEffect, useRef, useState } from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  useLinking,
} from "@react-navigation/native";

import * as Analytics from "expo-firebase-analytics";

import LinkingConfiguration from "./LinkingConfiguration";
import useMobile from "../hooks/useMobile";
import TabNavigatorWeb from "./TabNavigatorWeb";
import TabNavigatorMobile from "./TabNavigatorMobile";
import { ActivityIndicator } from "react-native";

export default function Navigation() {
  const ref = useRef();
  const { getInitialState } = useLinking(ref, LinkingConfiguration);

  const [isReady, setIsReady] = useState<boolean>(false);
  const [initialState, setInitialState] = useState<any>();

  useEffect(() => {
    getInitialState()
      .then((state) => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      })
      .catch((error) => console.log(error));
  }, [getInitialState]);

  if (!isReady) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer
      documentTitle={{
        formatter: (options, route) => "Agustin Vazquez",
      }}
      initialState={initialState}
      ref={ref}
      onStateChange={(state) => {
        if (state === null || state === undefined) return;
        const tabRoute = getActiveRouteState(state);
        const currentRoute = getFocusedRouteNameFromRoute(tabRoute);

        Analytics.logEvent(currentRoute || tabRoute.name);
      }}
    >
      <RootNavigator initialState={initialState} />
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

function RootNavigator({ initialState }) {
  const isMobilePhone = useMobile();
  if (isMobilePhone) {
    return <TabNavigatorMobile />;
  } else {
    return <TabNavigatorWeb initialState={initialState} />;
  }
}
