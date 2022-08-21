import { AppBar, Button, Toolbar } from "@mui/material";
import { useState } from "react";
import Fonts from "../constants/fonts";
import useMobile from "../hooks/useMobile";
import AboutMeScreen from "../screens/about_me/AboutMe.screen";

import DownloadApp from "../screens/download_app/DownloadApp.screen";
import PokemonSwiper from "../screens/pokemon/PokemonSwiper.screen";
import PortfolioScreen from "../screens/portfolio/PortfolioScreen.screen";
import WorkExperienceScreen from "../screens/work_experience/WorkExperience.screen";
import { ColorTheme, useTheme } from "../theme/Theme.interface";
import TabNavigatorMobile from "./TabNavigatorMobile";

const MENU_ITEMS = [
  "About Me",
  "Animations",
  "Portfolio",
  "Work Experience",
  "Download App",
];

const RenderContent = ({ tab }: { tab: number }) => {
  switch (tab) {
    case 0:
      return <AboutMeScreen />;
    case 1:
      return <PokemonSwiper />;
    case 2:
      return <PortfolioScreen />;
    case 3:
      return <WorkExperienceScreen />;
    case 4:
      return <DownloadApp />;
    default:
      return null;
  }
};

const TabNavigator = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [currentTab, setCurrentTab] = useState<number>(0);

  return (
    <AppBar position="static" sx={styles.appbar}>
      <Toolbar>
        {MENU_ITEMS.map((page, index) => {
          const selected = index === currentTab;
          return (
            <Button
              key={page}
              onClick={() => setCurrentTab(index)}
              sx={{
                color: "white",
                fontFamily: selected ? Fonts.bold : Fonts.regular,
                display: "block",
              }}
            >
              {page}
            </Button>
          );
        })}
      </Toolbar>

      <RenderContent tab={currentTab} />
    </AppBar>
  );
};

const createStyles = (theme: ColorTheme) => {
  const styles = {
    appbar: {
      backgroundColor: theme.navigationBackground,
    },
  };
  return styles;
};

export default TabNavigator;
