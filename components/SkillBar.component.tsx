import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ColorTheme, useTheme } from "../theme/Theme.interface";

interface Props {
  name: string;
  value: number;
}

const SkillBar = ({ name, value }: Props) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.containerBar}>
        <View style={[styles.coloredBar, { flex: value }]} />
        <View style={[styles.backgroundBar, { flex: 1 - value }]} />
      </View>
    </View>
  );
};

const BORDER_RADIUS = 10;
const MARGIN = 10;

const createStyles = (theme: ColorTheme) => {
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: MARGIN,
    },
    title: {
      color: theme.onPrimary,
      fontSize: 16,
      fontWeight: "bold",
      marginVertical: MARGIN,
    },
    containerBar: {
      height: 40,
      flexDirection: "row",
    },
    coloredBar: {
      backgroundColor: theme.onPrimary,
      borderTopLeftRadius: BORDER_RADIUS,
      borderBottomLeftRadius: BORDER_RADIUS,
    },
    backgroundBar: {
      backgroundColor: theme.surface,
      borderTopRightRadius: BORDER_RADIUS,
      borderBottomRightRadius: BORDER_RADIUS,
    },
  });
  return styles;
};

export default SkillBar;
