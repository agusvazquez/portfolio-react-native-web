import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import Modal from "react-native-modal";
import Fonts from "../constants/fonts";
import { ColorTheme, useTheme } from "../theme/Theme.interface";

interface IProps {
  handleModalClose: () => void;
  isVisible: boolean;
  title: string;
  message: string;
}

const AlertModal = ({
  handleModalClose,
  isVisible,
  title,
  message,
}: IProps) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  return (
    <Modal isVisible={isVisible} animationIn="slideInUp">
      <View style={styles.modalContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{message}</Text>

        <Button title={"Close"} onPress={handleModalClose} />
      </View>
    </Modal>
  );
};

const PADDING = 20;
const createStyles = (theme: ColorTheme) => {
  return StyleSheet.create({
    modalContainer: {
      width: 600,
      padding: PADDING,
      alignSelf: "center",
      backgroundColor: theme.onSurface,
      borderRadius: 20,
      elevation: 10,
      shadowColor: "black",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: 20,
      color: theme.background,
      marginBottom: PADDING,
    },
    description: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: theme.background,
      marginBottom: PADDING,
    },
  });
};
export default AlertModal;
