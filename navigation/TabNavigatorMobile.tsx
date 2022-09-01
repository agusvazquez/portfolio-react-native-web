import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ColorTheme, useTheme } from "../theme/Theme.interface";

import StackNavigators from "./StackNavigators";

const BottomTab = createBottomTabNavigator();

export default function TabNavigator() {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <BottomTab.Navigator screenOptions={styles.barOptions}>
      <BottomTab.Screen
        name="About Me"
        component={StackNavigators.AboutMeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Animations"
        component={StackNavigators.PokemonNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="play-circle-filled" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Portfolio"
        component={StackNavigators.PortfolioNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="work" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Work Experience"
        component={StackNavigators.WorkExperienceNavigator}
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

const createStyles = (theme: ColorTheme) => {
  const styles = {
    barOptions: {
      tabBarActiveTintColor: theme.onSurface,
      tabBarInactiveTintColor: theme.surface,
      tabBarStyle: {
        backgroundColor: theme.navigationBackground,
      },
      headerShown: false,
    },
  };
  return styles;
};
