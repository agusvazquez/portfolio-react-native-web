import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import PokemonSwiper from "../screens/pokemon/PokemonSwiper.screen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { ColorTheme, useTheme } from "../theme/Theme.interface";
import { getPokemonDetail } from "../api/pokemon.api";
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
        name="TabTwo"
        component={TabTwoNavigator}
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

      <PokemonStack.Screen
        name="PokemonDetails"
        component={PokemonDetails}
        options={{ headerTitle: "Pokemon" }}
      />
    </PokemonStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

// TODO
// Portfolio
// Work Experience
// Skills - Education
// About Me - Email - Social Network urls - Link to CV & website

function TabTwoNavigator() {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <TabTwoStack.Navigator screenOptions={styles.navOptions}>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Two Title" }}
      />
    </TabTwoStack.Navigator>
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
