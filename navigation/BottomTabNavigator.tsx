import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import PokemonSwiper from "../screens/pokemon/PokemonSwiper.screen";
import PortfolioScreen from "../screens/portfolio/PortfolioScreen.screen";
import { ColorTheme, useTheme } from "../theme/Theme.interface";
import PokemonDetails from "../screens/pokemon/PokemonDetails.screen";

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
        name="Pokemon"
        component={PokemonNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Portfolio"
        component={PortfolioNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const PokemonStack = createStackNavigator();

function PokemonNavigator() {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <PokemonStack.Navigator screenOptions={styles.navOptions}>
      <PokemonStack.Screen
        name="PokemonSwiper"
        component={PokemonSwiper}
        options={{ headerTitle: "Pokemon" }}
      />
    </PokemonStack.Navigator>
  );
}

const PortfolioStack = createStackNavigator();

// TODO
// Portfolio
// Work Experience
// Skills - Education
// About Me - Email - Social Network urls - Link to CV & website

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
