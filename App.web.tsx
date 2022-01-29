import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./navigation";
import { ColorTheme, useTheme } from "./theme/Theme.interface";


const QR_PLAYSTORE = "https://portfolio.agustinvazquez.com/expo/expo_playstore.png";
const QR_APPSTORE = "https://portfolio.agustinvazquez.com/expo/expo_appstore.png";
const QR_ANDROID = "https://portfolio.agustinvazquez.com/expo/expo_android.png";
const QR_IOS = "https://portfolio.agustinvazquez.com/expo/expo_ios.png";


export default function App() {

  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const [width, setWidth] = useState<number>(window.innerWidth);
  const [platform, setPlatform] = useState<string>('android');

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  let isMobile: boolean = width <= 768;

  if (isMobile) {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    );
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.text}>Step 1: Download Expo App.</Text>
      <View style={styles.column}>
          
          <View style={styles.row}>
            <Text style={styles.text}>Android</Text>
            <Image style={styles.qrCode} source={{uri: QR_PLAYSTORE}} />
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>iOS</Text>
            <Image style={styles.qrCode} source={{uri: QR_APPSTORE}} />
          </View>
      </View>

      <Text style={styles.text}>Step 2: Scan this QR code in Expo App.</Text>
      <View style={styles.column}>
          
          <View style={styles.row}>
            <Text style={styles.text}>Android</Text>
            <Image style={styles.qrCode} source={{uri: QR_ANDROID}} />
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>iOS</Text>
            <Image style={styles.qrCode} source={{uri: QR_IOS}} />
          </View>
      </View>
        

    </View>
  );
}

const createStyles = (theme: ColorTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.background
    },
    column: {
      flexDirection:'row',
      margin: 10,
    },
    row: {
      alignItems:'center'
    },
    text: {
      fontWeight: "bold",
      fontSize: 16,
      color: theme.primary,
    },
    qrCode: {
      width: 256,
      height: 256,
      margin: 20,
    }
  });
  return styles;
};
