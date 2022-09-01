/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/"), "'https://sample.agustinvazquez.com'"],
  config: {
    screens: {
      "About Me": {
        screens: {
          AboutMeScreen: "about_me",
        },
      },
      Animations: {
        screens: {
          PokemonSwiper: "pokemon_swiper",
        },
      },
      Portfolio: {
        screens: {
          PortfolioScreen: "portfolio",
        },
      },
      "Work Experience": {
        screens: {
          WorkExperienceScreen: "work_experience",
        },
      },
      "Download App": {
        screens: {
          "Download App": "download",
        },
      },
    },
  },
  NotFound: "*",
};
