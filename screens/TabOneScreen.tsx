import * as React from "react";
import { StyleSheet, View } from "react-native";
import Deck from "../components/Deck";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Deck />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
