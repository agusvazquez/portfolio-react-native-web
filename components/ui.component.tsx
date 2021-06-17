import React from "react";
import { View, StyleSheet } from "react-native";
import { ColorTheme, useTheme } from "../theme/Theme.interface";

interface Props {
  children?: React.ReactNode;
}

export const Background = ({ children }: Props) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return <View style={styles.container}>{children}</View>;
};

const createStyles = (theme: ColorTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
  return styles;
};
