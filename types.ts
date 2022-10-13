import { InteractionManagerStatic } from "react-native";

export type PokemonListType = {
  id: number;
  name: string;
  uri: string;
};

export type PortfolioItemType = {
  name: string;
  disabled: boolean;
  description: string;
  image: string;
  url_web: string;
  url_android: string;
  url_ios: string;
  tintColor: string;
  platforms: string[];
  lastWork?: string;
  currentlyWorking: boolean;
};

export type SocialItemType = {
  name: string;
  url: string;
  icon: string;
};

export type SkillItemType = {
  name: string;
  level: number;
};
