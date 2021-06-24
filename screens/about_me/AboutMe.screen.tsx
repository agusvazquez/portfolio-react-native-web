import React from "react";
import { StyleSheet, Text } from "react-native";

import { Background } from "../../components/ui.component";
import { ColorTheme, useTheme } from "../../theme/Theme.interface";

const AboutMeScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <Background>
      <Text style={styles.text}>About Me</Text>
    </Background>
  );
};

const createStyles = (theme: ColorTheme) => {
  const styles = StyleSheet.create({
    text: {
      color: theme.onPrimary,
    },
  });
  return styles;
};

export default AboutMeScreen;
