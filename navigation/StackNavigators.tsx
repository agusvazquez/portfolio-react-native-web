import React from "react";
import { useTheme } from "@emotion/react";
import { createStackNavigator } from "@react-navigation/stack";
import PokemonSwiper from "../screens/pokemon/PokemonSwiper.screen";
import DownloadApp from "../screens/download_app/DownloadApp.screen";
import AboutMeScreen from "../screens/about_me/AboutMe.screen";
import WorkExperienceScreen from "../screens/work_experience/WorkExperience.screen";
import PortfolioScreen from "../screens/portfolio/PortfolioScreen.screen";
import Fonts from "../constants/fonts";
import { ColorTheme } from "../theme/Theme.interface";
import useMobile from "../hooks/useMobile";

const Stack = createStackNavigator();

function PokemonNavigator() {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const headerShown = useMobile();

  return (
    <Stack.Navigator screenOptions={styles.navOptions}>
      <Stack.Screen
        name="PokemonSwiper"
        component={PokemonSwiper}
        options={{ headerTitle: "Animations", headerShown }}
      />
    </Stack.Navigator>
  );
}

function PortfolioNavigator() {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const headerShown = useMobile();

  return (
    <Stack.Navigator screenOptions={styles.navOptions}>
      <Stack.Screen
        name="PortfolioScreen"
        component={PortfolioScreen}
        options={{ headerTitle: "Portfolio", headerShown }}
      />
    </Stack.Navigator>
  );
}

function WorkExperienceNavigator() {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const headerShown = useMobile();

  return (
    <Stack.Navigator screenOptions={styles.navOptions}>
      <Stack.Screen
        name="WorkExperienceScreen"
        component={WorkExperienceScreen}
        options={{ headerTitle: "Work Experience", headerShown }}
      />
    </Stack.Navigator>
  );
}

function AboutMeStackNavigator() {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const headerShown = useMobile();

  return (
    <Stack.Navigator screenOptions={styles.navOptions}>
      <Stack.Screen
        name="AboutMeScreen"
        component={AboutMeScreen}
        options={{ headerTitle: "About Me", headerShown }}
      />
    </Stack.Navigator>
  );
}

function DownloadAppstackNavigator() {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const headerShown = useMobile();

  return (
    <Stack.Navigator screenOptions={styles.navOptions}>
      <Stack.Screen
        name="DownloadApp"
        component={DownloadApp}
        options={{ headerTitle: "Download App", headerShown }}
      />
    </Stack.Navigator>
  );
}

export default {
  PortfolioNavigator,
  DownloadAppstackNavigator,
  WorkExperienceNavigator,
  AboutMeStackNavigator,
  PokemonNavigator,
};

const createStyles = (theme: ColorTheme) => {
  const styles = {
    navOptions: {
      headerStyle: {
        backgroundColor: theme.navigationBackground,
      },
      headerTitleStyle: {
        fontFamily: Fonts.bold,
        color: theme.onSurface,
      },
    },
  };
  return styles;
};
