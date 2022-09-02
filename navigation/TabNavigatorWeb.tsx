import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { AppBar, Button, Toolbar } from "@mui/material";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Fonts from "../constants/fonts";

import { ColorTheme, useTheme } from "../theme/Theme.interface";
import StackNavigators from "./StackNavigators";
import { createStackNavigator } from "@react-navigation/stack";
import AlertModal from "../components/Alert.modal";
import LocalizedStrings from "../localization/LocalizedStrings";
import { useNavigation, useRoute } from "@react-navigation/native";

const MENU_ITEMS = [
  "About Me",
  "Animations",
  "Portfolio",
  "Work Experience",
  "Download App",
];

const Stack = createStackNavigator();

const RenderContent = () => {
  return (
    <Stack.Navigator defaultScreenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="About Me"
        component={StackNavigators.AboutMeStackNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Animations"
        component={StackNavigators.PokemonNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Portfolio"
        component={StackNavigators.PortfolioNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Work Experience"
        component={StackNavigators.WorkExperienceNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Download App"
        component={StackNavigators.DownloadAppstackNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();

  const [currentTab, setCurrentTab] = useState<number>(0);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const FIRST_TIME_KEY = "is_first_time";
    AsyncStorage.getItem(FIRST_TIME_KEY).then((item) => {
      if (item === null) {
        setModalVisible(true);
        AsyncStorage.setItem(FIRST_TIME_KEY, "true");
      }
    });

    const navigationState = navigation.getState();
    if (navigationState != undefined) {
      const initialRouteName = navigationState.routes[0].name;
      setCurrentTab(MENU_ITEMS.findIndex((item) => item === initialRouteName));
    }
  }, []);

  return (
    <View style={styles.container}>
      <AppBar position="static" sx={styles.appbar}>
        <Toolbar>
          {MENU_ITEMS.map((page, index) => {
            const selected = index === currentTab;
            return (
              <Button
                key={page}
                onClick={() => {
                  setCurrentTab(index);
                  navigation.navigate(MENU_ITEMS[index]);
                }}
                sx={{
                  color: "white",
                  fontFamily: selected ? Fonts.bold : Fonts.regular,
                  display: "block",
                }}
              >
                {page}
              </Button>
            );
          })}
        </Toolbar>

        <AlertModal
          isVisible={isModalVisible}
          handleModalClose={() => setModalVisible(false)}
          title={LocalizedStrings.desktopModal.title}
          message={LocalizedStrings.desktopModal.message}
        />
      </AppBar>

      <RenderContent tab={currentTab} />
    </View>
  );
};

const createStyles = (theme: ColorTheme) => {
  const styles = {
    container: {
      flex: 1,
    },
    appbar: {
      backgroundColor: theme.navigationBackground,
    },
  };
  return styles;
};

export default TabNavigator;
