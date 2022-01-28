import { useColorScheme } from "react-native";
import { DarkColorTheme } from "./Dark.theme";
import { LightColorTheme } from "./Light.theme";

export interface ColorTheme {
  primary: string;
  surface: string;
  onSurface: string;
  background: string;
  navigationBackground: string;
}

export const useTheme = (): ColorTheme => {
  const colorScheme = useColorScheme();

  if (colorScheme === "dark") return DarkColorTheme;
  else return LightColorTheme;
};
