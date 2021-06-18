import React from "react";
import { StyleSheet, FlatList, Platform, Linking, View } from "react-native";

import { Background } from "../../components/ui.component";

import portfolioData from "../../json/portfolio.json";
import { ColorTheme, useTheme } from "../../theme/Theme.interface";
import { PortfolioItemType } from "../../types";
import PortfolioItem from "./PortfolioItem.screen";

export default function PortfolioScreen() {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const onItemPressed = (item: PortfolioItemType) => {
    switch (Platform.OS) {
      case "web":
        if (item.url_web) {
          Linking.openURL(item.url_web);
          break;
        }
      case "android":
        if (item.url_android) {
          Linking.openURL(item.url_android);
          break;
        }
      case "ios":
        if (item.url_ios) {
          Linking.openURL(item.url_ios);
          break;
        }
    }
  };

  return (
    <Background>
      <FlatList
        data={portfolioData as PortfolioItemType[]}
        contentContainerStyle={styles.container}
        numColumns={COLUMN_COUNT}
        ListFooterComponent={() => <View style={styles.footer} />}
        renderItem={({ item }) => (
          <PortfolioItem
            key={item.name}
            item={item}
            onPress={onItemPressed}
            containerStyle={{ margin: MARGIN, flex: 1 / COLUMN_COUNT }}
          />
        )}
      />
    </Background>
  );
}

const COLUMN_COUNT = 2;
const MARGIN = 10;

const createStyles = (theme: ColorTheme) => {
  const styles = StyleSheet.create({
    container: {
      margin: MARGIN,
    },
    footer: {
      height: MARGIN * 2,
    },
  });
  return styles;
};
