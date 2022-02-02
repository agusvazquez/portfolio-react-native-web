import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppLoading from 'expo-app-loading';
import { useFonts, PlayfairDisplay_400Regular, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';

import Navigation from "./navigation";

export default function App() {

  let [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  );
}
