import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { Avatar, Badge } from "react-native-elements";

import { Background } from "../../components/ui.component";
import { ColorTheme, useTheme } from "../../theme/Theme.interface";
import DATA from "../../json/about_me.json";

const AboutMeScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const {
    headline,
    about_me,
    profile_image,
    name,
    email,
    social,
    libraries,
    languages,
    education,
  } = DATA;

  return (
    <Background>
      <ScrollView>
        <Avatar
          rounded
          size="large"
          containerStyle={styles.avatar}
          source={{
            uri: profile_image,
          }}
        />

        <Text>{name}</Text>
        <Text>{email}</Text>
        <Text>{headline}</Text>
        {social.map((item) => {
          const { name } = item;
          return <Text key={name}>{name}</Text>;
        })}

        <Text>{about_me}</Text>

        <View style={styles.badgeContainer}>
          {libraries.map((library) => {
            return (
              <Badge key={library} badgeStyle={styles.badge} value={library} />
            );
          })}
        </View>

        <View style={styles.badgeContainer}>
          {languages.map((language) => {
            return (
              <Badge
                key={language}
                badgeStyle={styles.badge}
                value={language}
              />
            );
          })}
        </View>

        {education.map((item) => {
          const { name } = item;
          return <Text key={name}>{name}</Text>;
        })}
      </ScrollView>
    </Background>
  );
};

const createStyles = (theme: ColorTheme) => {
  const styles = StyleSheet.create({
    text: {
      color: theme.primary,
    },
    avatar: {
      marginTop: 20,
      alignSelf: "center",
    },
    badgeContainer: {
      margin: 10,
      flexDirection: "row",
      flexWrap: "wrap",
    },
    badge: {
      margin: 1,
    },
  });
  return styles;
};

export default AboutMeScreen;
