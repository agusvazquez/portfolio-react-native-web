import React from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Linking, Image } from "react-native";
import { Avatar, Badge, Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import { Background } from "../../components/ui.component";
import { ColorTheme, useTheme } from "../../theme/Theme.interface";
import DATA from "../../json/about_me.json";

import { SocialItemType } from "../../types";

interface SocialIconProps {
  item: SocialItemType;
}

const AboutMeScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const {
    headline,
    about_me,
    profile_image,
    name,
    role,
    email,
    social,
    libraries,
    languages,
    platforms,
    resumeUrl
  } = DATA;

  

  const SocialIcon = ({item} : SocialIconProps) => {
    const { name, icon, url } = item;
    return <TouchableOpacity onPress={() => Linking.openURL(url)}>
        {name == 'Toptal' ? 
        <Image  style={styles.iconStyle} source={{uri: icon}} /> : 
        <Ionicons size={ICON_SIZE}
          color={theme.primary}
          name={icon}/> }
      </TouchableOpacity>
  }

  const PlatformView = ({name, icon}) => {
    return <View style={styles.containerPlatform}>
      <Image style={styles.iconStyle} source={{uri: icon}} />
      <Text style={styles.text}>{name}</Text>
    </View>
  }


  return (
    <Background>
      <ScrollView style={styles.container}>
        
        <Avatar
          rounded
          size="xlarge"
          containerStyle={styles.avatar}
          source={{
            uri: profile_image,
          }}
        />

<Text style={styles.textRole}>{role}</Text> 
        <Text style={styles.textName}>{name}</Text>
        
        <TouchableOpacity onPress={() => Linking.openURL('mailto:' + email)}>
          <Text style={styles.textEmail}>{email}</Text>
        </TouchableOpacity>
        <Text style={styles.textHeadline}>{headline}</Text>

        <View style={styles.containerSocial}>
        {social.map((item) => {
            return <SocialIcon key={"social_" + item.name} item={item}/>
        })}
        </View>

        <Text style={styles.text}>{about_me}</Text>


        <Text style={styles.textHeader}>Platforms</Text>
        <View style={styles.containerPlatforms}>
        {platforms.map((item, index) => {
          const {name, icon} = item;
          return <PlatformView key={"platform_" + index} name={name} icon={icon} />
        })}
        </View>

        <Text style={styles.textHeader}>Libraries</Text>
        <View style={styles.badgeContainer}>
          {libraries.map((library) => {
            return (
              <Badge key={library} badgeStyle={styles.badge} value={library} />
            );
          })}
        </View>

        <Text style={styles.textHeader}>Programming Languages</Text>
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

        <Button title="Download CV" onPress={() => Linking.openURL(resumeUrl)}/>

        <View style={{height:10}}/>
      </ScrollView>
    </Background>
  );
};

const ICON_SIZE = 32;

const createStyles = (theme: ColorTheme) => {
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 10,
    },
    avatar: {
      marginTop: 20,
      alignSelf: "center",
    },
    containerPlatforms: {
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginVertical: 10,
    },
    containerPlatform: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    containerSocial: {
      width: 300,
      alignSelf: 'center',
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginVertical: 10,
    },
    
    iconStyle: {
      tintColor: theme.primary, 
      width: ICON_SIZE, 
      height: ICON_SIZE,
      resizeMode: 'contain',
    },
    text: {
      color: theme.primary,
    },
    textRole: {
      color: theme.primary,
      fontSize: 30,
      fontWeight: 'bold',
      alignSelf: 'center'
    },
    textName: {
      color: theme.primary,
      fontSize: 24,
      fontWeight: 'bold',
      alignSelf: 'center'
    },
    textHeader: {
      color: theme.primary,
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    textEmail: {
      color: theme.primary,
      alignSelf: 'center'
    },
    textHeadline: {
      color: theme.primary,
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: 10,
      marginHorizontal: 20
    },
    badgeContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 10,
    },
    badge: {
      height: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.surface,
      marginHorizontal: 5,
      margin: 1,
    },
  });
  return styles;
};

export default AboutMeScreen;
