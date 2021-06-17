import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ColorTheme, useTheme } from "../../theme/Theme.interface";
import { Background } from "../../components/ui.component";

const PokemonDetails = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <Background>
      <Text style={styles.headerText}>asdasd</Text>
    </Background>
  );
};

const createStyles = (theme: ColorTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    headerText: {
      color: theme.onPrimary,
      fontSize: 16,
      fontWeight: "bold",
      marginVertical: 10,
      alignSelf: "center",
    },
  });
  return styles;
};

export default PokemonDetails;
