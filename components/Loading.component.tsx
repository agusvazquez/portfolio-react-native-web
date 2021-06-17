import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { ColorTheme, useTheme } from "../theme/Theme.interface";

interface Props {
  loading: boolean;
}

const Loading = ({ loading }: Props) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  if (loading == false) return null;
  else
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.onPrimary} />
      </View>
    );
};

const styles = StyleSheet.create({});

const createStyles = (theme: ColorTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return styles;
};

export default Loading;
