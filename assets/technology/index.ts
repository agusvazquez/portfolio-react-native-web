const androidIcon = require("./android.png");
const iosIcon = require("./ios.png");
const reactNativeIcon = require("./react_native.png");

export const getTechIcon = (id: string) => {
  switch (id) {
    case "android":
      return androidIcon;
    case "ios":
      return iosIcon;
    case "react_native":
      return reactNativeIcon;
  }
};
