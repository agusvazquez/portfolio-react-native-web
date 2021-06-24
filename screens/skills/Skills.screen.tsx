import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import SkillBar from "../../components/SkillBar.component";

import { Background } from "../../components/ui.component";
import { ColorTheme, useTheme } from "../../theme/Theme.interface";
import DATA from "../../json/skills.json";
import { SkillItemType } from "../../types";

const SkillsScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <Background>
      <FlatList
        data={DATA as SkillItemType[]}
        keyExtractor={(item) => item.name}
        ListFooterComponent={() => <View style={styles.footer} />}
        renderItem={({ item }) => {
          const { name, level } = item;
          return <SkillBar name={name} value={level} />;
        }}
      />
    </Background>
  );
};

const createStyles = (theme: ColorTheme) => {
  const styles = StyleSheet.create({
    text: {
      color: theme.onPrimary,
    },
    footer: {
      height: 10,
    },
  });
  return styles;
};

export default SkillsScreen;
