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
import Fonts from "../../constants/fonts";
import { ColorTheme, useTheme } from "../../theme/Theme.interface";
import { PortfolioItemType } from "../../types";

interface Props {
  item: PortfolioItemType;
  onPress: (item: PortfolioItemType) => void;
  containerStyle: ViewStyle;
}

const getColorProps = (tintColor: string) => {
  let textShadowColor = "black";
  if (tintColor === "white") textShadowColor = "black";
  else if (tintColor === "black") textShadowColor = "white";
  return {
    color: tintColor,
    textShadowColor,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0.5,
  };
};

const PortfolioItem = ({ item, containerStyle, onPress }: Props) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const { platforms, image, tintColor, lastWork, name } = item;

  return (
    <TouchableOpacity
      style={[styles.itemContainer, containerStyle]}
      onPress={() => onPress(item)}
    >
      <Image style={styles.image} source={{ uri: image }} />

      <Text
        style={[styles.leftText, getColorProps(tintColor || theme.primary)]}
      >
        {name}
      </Text>
      <Text
        style={[styles.rightText, getColorProps(tintColor || theme.primary)]}
      >
        {lastWork}
      </Text>

      <View style={styles.platformContainer}>
        {platforms.map((platform) => {
          return (
            <Image
              key={platform}
              style={[
                styles.platformImage,
                { tintColor: tintColor || theme.primary },
              ]}
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
      width: 24,
      height: 24,
      margin: 5,
    },
    leftText: {
      fontFamily: Fonts.bold,
      position: "absolute",
      top: 5,
      left: 5,
    },
    rightText: {
      fontFamily: Fonts.bold,
      position: "absolute",
      top: 5,
      right: 5,
    },
    headerText: {
      color: theme.primary,
    },
  });
  return styles;
};

export default PortfolioItem;
