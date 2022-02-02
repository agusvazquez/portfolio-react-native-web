import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import PokemonSwiper from "../screens/pokemon/PokemonSwiper.screen";
import PortfolioScreen from "../screens/portfolio/PortfolioScreen.screen";
import { ColorTheme, useTheme } from "../theme/Theme.interface";
import WorkExperienceScreen from "../screens/work_experience/WorkExperience.screen";
import AboutMeScreen from "../screens/about_me/AboutMe.screen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <BottomTab.Navigator
      initialRouteName="Pokemon"
      tabBarOptions={styles.barOptions}
    >
      <BottomTab.Screen
        name="About Me"
        component={AboutMeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Animations"
        component={PokemonNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="play-circle-filled" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Portfolio"
        component={PortfolioNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="work" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Work Experience"
        component={WorkExperienceNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="construction" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={30} {...props} />;
}

// About Me - Email - Social Network urls - Link to CV & website

const PokemonStack = createStackNavigator();
function PokemonNavigator() {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <PokemonStack.Navigator screenOptions={styles.navOptions}>
      <PokemonStack.Screen
        name="PokemonSwiper"
        component={PokemonSwiper}
        options={{ headerTitle: "Animations" }}
      />
    </PokemonStack.Navigator>
  );
}

const PortfolioStack = createStackNavigator();
function PortfolioNavigator() {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <PortfolioStack.Navigator screenOptions={styles.navOptions}>
      <PortfolioStack.Screen
        name="PortfolioScreen"
        component={PortfolioScreen}
        options={{ headerTitle: "Portfolio" }}
      />
    </PortfolioStack.Navigator>
  );
}

const WorkExperienceStack = createStackNavigator();
function WorkExperienceNavigator() {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <WorkExperienceStack.Navigator screenOptions={styles.navOptions}>
      <WorkExperienceStack.Screen
        name="WorkExperienceScreen"
        component={WorkExperienceScreen}
        options={{ headerTitle: "Work Experience" }}
      />
    </WorkExperienceStack.Navigator>
  );
}

const AboutMeStack = createStackNavigator();
function AboutMeStackNavigator() {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <AboutMeStack.Navigator screenOptions={styles.navOptions}>
      <AboutMeStack.Screen
        name="AboutMeScreen"
        component={AboutMeScreen}
        options={{ headerTitle: "About Me" }}
      />
    </AboutMeStack.Navigator>
  );
}

const createStyles = (theme: ColorTheme) => {
  const styles = {
    barOptions: {
      activeTintColor: theme.onSurface,
      inactiveTintColor: theme.surface,
      style: {
        backgroundColor: theme.navigationBackground,
      },
    },
    navOptions: {
      headerStyle: {
        backgroundColor: theme.navigationBackground,
      },
      headerTintColor: theme.onSurface,
    },
  };
  return styles;
};
