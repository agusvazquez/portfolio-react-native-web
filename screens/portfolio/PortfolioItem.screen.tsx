import React from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from "react-native";

import { getTechIcon } from "../../assets/technology";
import { ColorTheme, useTheme } from "../../theme/Theme.interface";
import { PortfolioItemType } from "../../types";

interface Props {
  item: PortfolioItemType;
  onPress: (item: PortfolioItemType) => void;
  containerStyle: ViewStyle;
}

const PortfolioItem = ({ item, containerStyle, onPress }: Props) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const { platforms, image, tintColor, lastWork } = item;

  return (
    <TouchableOpacity
      style={[styles.itemContainer, containerStyle]}
      onPress={() => onPress(item)}
    >
      <Image style={styles.image} source={{ uri: image }} />

      <Text style={[styles.text, { color: tintColor }]}>{lastWork}</Text>

      <View style={styles.platformContainer}>
        {platforms.map((platform) => {
          return (
            <Image
              key={platform}
              style={[styles.platformImage, { tintColor: tintColor }]}
              source={getTechIcon(platform)}
            />
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme: ColorTheme) => {
  const styles = StyleSheet.create({
    itemContainer: {
      aspectRatio: 1,
      borderRadius: 10,
      padding: 0,
    },
    image: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      resizeMode: "contain",
      overflow: "hidden",
      borderRadius: 10,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    platformContainer: {
      position: "absolute",
      bottom: 2,
      right: 2,
      flexDirection: "row",
      alignItems: "center",
    },
    platformImage: {
      width: 15,
      height: 15,
    },
    text: {
      position: "absolute",
      top: 5,
      right: 5,
      fontWeight: "bold",
    },
    headerText: {
      color: theme.primary,
    },
  });
  return styles;
};

export default PortfolioItem;
