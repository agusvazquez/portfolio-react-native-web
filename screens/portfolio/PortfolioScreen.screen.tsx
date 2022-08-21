import React from "react";
import {
  StyleSheet,
  FlatList,
  Platform,
  Linking,
  View,
  Text,
} from "react-native";

import { Background } from "../../components/ui.component";
import useMobile from "../../hooks/useMobile";
import useWindow from "../../hooks/useWindow";

import portfolioData from "../../json/portfolio.json";
import { ColorTheme, useTheme } from "../../theme/Theme.interface";
import { PortfolioItemType } from "../../types";
import PortfolioItem from "./PortfolioItem.component";

export default function PortfolioScreen() {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  //TODO: Improve to use screen width
  const window = useWindow();
  const COLUMN_COUNT = Math.round(window.innerWidth / 200);

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
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.container}
        numColumns={COLUMN_COUNT}
        ListFooterComponent={() => <View style={styles.footer} />}
        renderItem={({ item }) => (
          <PortfolioItem
            item={item}
            onPress={onItemPressed}
            containerStyle={{ margin: MARGIN, flex: 1 / COLUMN_COUNT }}
          />
        )}
      />
    </Background>
  );
}

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
