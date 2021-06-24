import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import PokemonSwiper from "../screens/pokemon/PokemonSwiper.screen";
import PortfolioScreen from "../screens/portfolio/PortfolioScreen.screen";
import { ColorTheme, useTheme } from "../theme/Theme.interface";
import WorkExperienceScreen from "../screens/work_experience/WorkExperience.screen";
import AboutMeScreen from "../screens/about_me/AboutMe.screen";
import SkillsScreen from "../screens/skills/Skills.screen";

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
            <TabBarIcon name="person-circle-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Skills"
        component={SkillsStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code-slash-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Animations"
        component={PokemonNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="play-circle-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Portfolio"
        component={PortfolioNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="build-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Work Experience"
        component={WorkExperienceNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="briefcase-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} {...props} />;
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

const SkillsStack = createStackNavigator();
function SkillsStackNavigator() {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <SkillsStack.Navigator screenOptions={styles.navOptions}>
      <SkillsStack.Screen
        name="SkillsScreen"
        component={SkillsScreen}
        options={{ headerTitle: "Skills" }}
      />
    </SkillsStack.Navigator>
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
      headerTintColor: theme.onPrimary,
    },
  };
  return styles;
};
