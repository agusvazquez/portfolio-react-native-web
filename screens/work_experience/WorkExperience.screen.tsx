import React from "react";
import { StyleSheet } from "react-native";

import Timeline from "react-native-timeline-flatlist";

import { Background } from "../../components/ui.component";
import { ColorTheme, useTheme } from "../../theme/Theme.interface";
import DATA from "../../json/work_experience.json";
import Fonts from "../../constants/fonts";

const WorkExperienceScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <Background>
      <Timeline
        data={DATA}
        listViewStyle={styles.timeline}
        lineColor={theme.primary}
        circleColor={theme.primary}
        timeStyle={styles.timelineDate}
        titleStyle={styles.timelineTitle}
        descriptionStyle={styles.timelineDescription}
      />
    </Background>
  );
};

const createStyles = (theme: ColorTheme) => {
  const styles = StyleSheet.create({
    timeline: {
      paddingTop: 10,
    },
    timelineDate: {
      fontFamily: Fonts.bold,
      color: theme.primary,
    },
    timelineTitle: {
      fontFamily: Fonts.bold,
      color: theme.primary,
    },
    timelineDescription: {
      fontFamily: Fonts.regular,
      color: theme.primary,
    },
  });
  return styles;
};

export default WorkExperienceScreen;
