import React from "react";
import { StyleSheet } from "react-native";

import Timeline from "react-native-timeline-flatlist";

import { Background } from "../../components/ui.component";
import { ColorTheme, useTheme } from "../../theme/Theme.interface";
import DATA from "../../json/work_experience.json";

const WorkExperienceScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <Background>
      <Timeline
        data={DATA}
        listViewStyle={styles.timeline}
        lineColor={theme.onPrimary}
        circleColor={theme.onPrimary}
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
      color: theme.onPrimary,
    },
    timelineTitle: {
      color: theme.onPrimary,
    },
    timelineDescription: {
      color: theme.onPrimary,
    },
  });
  return styles;
};

export default WorkExperienceScreen;
